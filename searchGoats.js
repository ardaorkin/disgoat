var fetch = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();

async function searchGoats() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=goat&searchType=image&sort=date`
    );
    const result = await response.json();
    const { items } = result;
    return items;
  } catch (error) {
    throw error;
  }
}
module.exports = { searchGoats };
