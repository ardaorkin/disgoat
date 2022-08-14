var fetch = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();

const { GOOGLE_SEARCH_KEY, SEARCH_ENGINE_ID } = process.env;

async function searchGoats(startIndex) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_KEY}&cx=${SEARCH_ENGINE_ID}&q=goat&searchType=image&sort=date&start=${startIndex}`
    );
    const result = await response.json();
    const { items } = result;
    return items;
  } catch (error) {
    throw error;
  }
}
module.exports = { searchGoats };
