require("dotenv").config();
const cheerio = require("cheerio");
const axios = require("axios");

const { OpenAI } = require("openai");

const baseUrl = "https://www.trustpilot.com";

async function getReviews(url) {
  const allReviews = new Array();
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      return null;
    }

    // Load page data
    const $ = cheerio.load(response.data);

    // Look after all components that have "reviewContentwrapper" in class name
    const reviews = $('[class*="reviewContentwrapper"]');
    reviews.each((index, element) => {
      // Get review data from defined components
      const newReview = {
        title: $(element)
          .find('[data-service-review-title-typography="true"]')
          .text(),
        content: $(element)
          .find('[data-service-review-text-typography="true"]')
          .text()
          .trim(),
        date: $(element)
          .find('[data-service-review-date-time-ago="true"]')
          .text(),
        dateOfExperience: $(element)
          .find('[data-service-review-date-of-experience-typography="true"]')
          .text(),
        rating: $(element)
          .find('[class*="reviewHeader"]')
          .attr("data-service-review-rating"),
        url: url,
      };

      allReviews.push(newReview);
    });

    // If next page button is not disabled go to next page
    if (
      $('[name="pagination-button-next"]').length > 0 &&
      !$('[name="pagination-button-next"]').is('[aria-disabled="true"]')
    ) {
      const nextPage =
        baseUrl + $('[name="pagination-button-next"]').attr("href");
      const nextPageReviews = await getReviews(nextPage);
      await allReviews.push(...nextPageReviews);
    }

    return allReviews;
  } catch (error) {
    console.error("Error - ", error);
    return null;
  }
}

function trimTextToMaxTokens(text, maxTokens) {
  const tokens = text.split(/\s+/);
  let currentTokens = 0;
  let trimmedText = "";

  for (const token of tokens) {
    if (currentTokens + token.length + 1 <= maxTokens) {
      trimmedText += token + " ";
      currentTokens += token.length + 1;
    } else {
      break;
    }
  }

  return trimmedText.trim();
}

async function summarizeReviews(reviews) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.CHATGPT_API_KEY,
    });
    // Join all reviews in a sigle string
    const reviewTexts = reviews.map((review) => review.content).join("\n\n");
    // Maximum Tokens is around 8000 for GPT4
    const trimmedText = trimTextToMaxTokens(reviewTexts, 8000);
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Summarize the following reviews:\n\n${trimmedText}`,
        },
      ],
    });

    return response.choices[0].message;
  } catch (error) {
    console.error("Error - ", error);
    return null;
  }
}

module.exports = {
  getReviews,
  summarizeReviews,
};
