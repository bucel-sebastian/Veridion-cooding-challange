// const Bull = require("bull");
// const dotenv = require("dotenv");
// const { enrichCompanyData } = require("./veridionService");
// const { getReviews, summarizeReviews } = require("./reviewScraper");
// // import dotenv from "dotenv";

// const baseUrl = "https://www.trustpilot.com";

// dotenv.config();

// const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;
// const queueOptions = {
//   redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASS },
//   limiter: {
//     max: 1,
//     duration: 1050,
//   },
// };

// const companiesQueue = new Bull("companies", queueOptions);

// companiesQueue.process(async (payload) => {
//   const currentTime = new Date();
//   const responseVeridionApi = await enrichCompanyData(payload.data.company);

//   const companyReviews =
//     responseVeridionApi !== 0
//       ? await getReviews(
//           baseUrl + "/review/" + responseVeridionApi.website_domain
//         )
//       : null;

//   const companyReviewsSummary =
//     companyReviews !== null ? await summarizeReviews(companyReviews) : null;
//   return {
//     ...payload.data.company,
//     companyData: responseVeridionApi,
//     reviewsSummary: companyReviewsSummary,
//   };
// });

// module.exports = {
//   companiesQueue,
// };
