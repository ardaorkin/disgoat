const fetch = require("node-fetch");
var FormData = require("form-data");
const dotenv = require("dotenv");
dotenv.config();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

async function authorizeSpotify() {
  try {
    const data = new URLSearchParams(
      new FormData({ grant_type: "client_credentials" })
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
          ),
      },
      body: data,
    });
    const result = await response.json();
    const { access_token } = result;
    return access_token;
  } catch (error) {
    throw error;
  }
}

module.exports = { authorizeSpotify };
