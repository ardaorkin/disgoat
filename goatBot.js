// Require the necessary discord.js classes
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
var cron = require("node-cron");
const { searchGoats } = require("./searchGoats");
const dotenv = require("dotenv");
dotenv.config();

const { DISCORD_CHANNEL_ID, DISCORD_BOT_TOKEN } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function embedGoats() {
  try {
    const items = await searchGoats();
    const randomId = Math.floor((new Date().getTime() / 100000) % 10);
    const itemWillEmbed = items[randomId];
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Hourly Lovely Goats")
      .setDescription(
        `[${itemWillEmbed.title}](${itemWillEmbed.image.contextLink})`
      )
      .setTimestamp()
      .setImage(itemWillEmbed.image.thumbnailLink);
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
  const task = cron.schedule("0 * * * *", async () => {
    await embedGoats();
  });
  task.start();
});

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);
