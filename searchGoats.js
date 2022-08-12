var fetch = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();

async function searchGoats() {
  const images = [];
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=goat&searchType=image&siteSearch=https://tr.pinterest.com&siteSearchFilter=i`
    );
    const result = await response.json();
    const { items } = result;
    items.map((item) => {
      images.push(item.image);
    });
    return images;
  } catch (error) {
    throw error;
  }
}
module.exports = { searchGoats };
