require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const Bull = require("bull");
const { enrichCompanyData } = require("./veridionService");
const { getReviews, summarizeReviews } = require("./reviewScraper");

const baseUrl = "https://www.trustpilot.com";

const app = express();
const port = process.env.BACKEND_PORT;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;
const queueOptions = {
  redis: { host: REDIS_HOST, port: REDIS_PORT },
  limiter: {
    max: 1,
    duration: 1050,
  },
};

io.on("connection", (socket) => {
  console.log("Client connected - ", socket.id);
  socket.join(socket.id);

  const companiesQueue = new Bull(socket.id, queueOptions);

  companiesQueue.on("completed", (job) => {
    // console.log("Job completed - ", job.returnvalue);
    try {
      socket.emit("companyJobCompleted", job.returnvalue);
    } catch (error) {
      console.log("Error - ", error);
    }
  });

  companiesQueue.process(async (payload) => {
    try {
      const currentTime = new Date();
      const responseVeridionApi = await enrichCompanyData(payload.data);

      const companyReviews =
        responseVeridionApi !== 0
          ? await getReviews(
              baseUrl + "/review/" + responseVeridionApi.website_domain
            )
          : null;
      const companyReviewsSummary =
        companyReviews !== null ? await summarizeReviews(companyReviews) : null;

      const returnData = {
        ...payload.data,
        companyData: responseVeridionApi,
        reviewsSummary: companyReviewsSummary,
      };
      return returnData;
    } catch (error) {
      console.log("Error - ", error);
    }
  });

  socket.on("addToQueue", (data) => {
    companiesQueue.add(data);
    console.log("Added to queue", data, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(bodyParser.json());

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // console.log(
  //   "ENV - ",
  //   process.env.REDIS_HOST,
  //   process.env.REDIS_PORT,
  //   process.env.REDIS_PASS,
  //   process.env.FRONTEND_URL,
  //   process.env.VERIDION_API_URL,
  //   process.env.VERIDION_API_KEY,
  //   process.env.CHATGPT_API_KEY
  // );
});
