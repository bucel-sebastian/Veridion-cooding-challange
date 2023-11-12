require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const Bull = require("bull");
const dotenv = require("dotenv");
const { enrichCompanyData } = require("./veridionService");
const { getReviews, summarizeReviews } = require("./reviewScraper");
// const { companiesQueue } = require("./bullQueue");

const app = express();
const port = process.env.BACKEND_PORT;

const server = createServer(app);

// Set up the address that is ok to get requests from
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;
const queueOptions = {
  redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASS },
  limiter: {
    max: 1,
    duration: 1050,
  },
};

// Real time connection to frontend user
io.on("connection", (socket) => {
  console.log("Client connected - ", socket.id);
  socket.join(socket.id);

  const companiesQueue = new Bull(socket.id, queueOptions);

  companiesQueue.process(async (payload) => {
    const currentTime = new Date();
    const responseVeridionApi = await enrichCompanyData(payload.data.company);

    const companyReviews =
      responseVeridionApi !== 0
        ? await getReviews(
            baseUrl + "/review/" + responseVeridionApi.website_domain
          )
        : null;

    const companyReviewsSummary =
      companyReviews !== null ? await summarizeReviews(companyReviews) : null;
    return {
      ...payload.data.company,
      companyData: responseVeridionApi,
      reviewsSummary: companyReviewsSummary,
    };
  });

  companiesQueue.on("completed", (job) => {
    socket.to(job.data.socketId).emit("companyJobCompleted", job.returnvalue);
  });

  socket.on("addToQueue", (data) => {
    companiesQueue.add(data);
    console.log("Added to queue", data, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(cors());
app.use(bodyParser.json());

// API Endpoint to add companie to queue
app.post("/api/enrich-companies", async (req, res) => {
  try {
    const requestBody = await req.body;
    const socketId = requestBody.socketId;
    const companies = requestBody.companies;

    const socket = io.sockets.sockets.get(socketId);

    for (const company of companies) {
      console.log(socketId, " - emite - ", company);
      // console.log(socket);
      socket
        .to(socketId)
        .emit("addToQueue", { company: company, socketId: socketId });
      // companiesQueue.add({ company: company, socketId: socketId });
    }

    // console.log("Companies added to queue!");
    res.status(200).json({ message: "Jobs added to the queue" });
  } catch (error) {
    console.error("ERROR - ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
