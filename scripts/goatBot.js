const { searchGoats } = require("./searchGoats");
const { randomIdGenerator } = require("../utils/randomIdGenerator");
const { embedGenerator } = require("../utils/embedGenerator");
const dotenv = require("dotenv");
dotenv.config();

const { DISCORD_CHANNEL_ID } = process.env;

async function goatBot(client) {
  try {
    const randomId = randomIdGenerator();
    const searchStartIndex = parseInt(Math.floor(Math.random() * 100));
    const items = await searchGoats(searchStartIndex);
    const {
      title,
      image: { contextLink, thumbnailLink },
    } = items[randomId];

    const embed = embedGenerator(title, contextLink, thumbnailLink);

    return client.channels.cache
      .get(DISCORD_CHANNEL_ID)
      .send({ embeds: [embed] });
  } catch (error) {
    return client.channels.cache
      .get(DISCORD_CHANNEL_ID)
      .send(error.message + " " + error.stack);
  }
}

module.exports = { goatBot };
