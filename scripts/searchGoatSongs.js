const fetch = require("node-fetch");
const { authorizeSpotify } = require("./authorizeSpotify");

async function searchGoatSongs(songIndex = 0) {
  try {
    const token = await authorizeSpotify();
    const response = await fetch(
      "https://api.spotify.com/v1/search?q=goat&type=track&limit=50",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    const {
      preview_url,
      artists,
      name,
      album: { images },
    } = result.tracks.items[songIndex];
    return { preview_url, artists, name, images };
  } catch (error) {
    throw error;
  }
}

// searchGoatSongs().then((songs) => console.log(songs));
module.exports = { searchGoatSongs };
