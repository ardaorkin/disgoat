// Require the necessary discord.js classes
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
var cron = require("node-cron");
const sharp = require("sharp");
const fetch = require("node-fetch");
const fs = require("fs");
const { searchGoats } = require("./searchGoats");
const dotenv = require("dotenv");
dotenv.config();

const {
  DISCORD_CHANNEL_ID,
  DISCORD_BOT_TOKEN,
  EMBED_IMAGE_URL,
  EMBED_IMAGE_FILE_NAME,
} = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function convertAndSaveImg(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const binary = Buffer.from(arrayBuffer, "binary");
    if (!fs.existsSync(EMBED_IMAGE_FILE_NAME)) {
      fs.writeFile(EMBED_IMAGE_FILE_NAME, "", () => {});
    }
    sharp(binary).resize(350, 260).toFile(EMBED_IMAGE_FILE_NAME);
  } catch (error) {
    throw error;
  }
}

async function embedGoats() {
  try {
    const images = await searchGoats();
    const randomId = Math.floor(
      parseInt(new Date().toLocaleTimeString("tr-Tr", { hour: "numeric" })) / 4
    );
    await convertAndSaveImg(images[randomId].thumbnailLink);

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Lovely Goats")
      .setImage(EMBED_IMAGE_URL + EMBED_IMAGE_FILE_NAME)
      .setTimestamp();

    return client.channels.cache
      .get(DISCORD_CHANNEL_ID)
      .send({ embeds: [embed] });
  } catch (error) {
    return client.channels.cache
      .get(DISCORD_CHANNEL_ID)
      .send(error.message + " " + error.stack);
  }
}

// When the client is ready, run this code (only once)
client.once("ready", async () => {
  await embedGoats();
  const task = cron.schedule("0 0 */1 * * *", async () => {
    await embedGoats();
  });
  task.start();
});

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);
