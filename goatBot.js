// Require the necessary discord.js classes
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { searchGoats } = require("./searchGoats");
const dotenv = require("dotenv");
dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function embedGoats() {
  try {
    const images = await searchGoats();
    const randomId = Math.floor(
      parseInt(new Date().toLocaleTimeString("tr-Tr", { hour: "numeric" })) / 4
    );

    const embed = new EmbedBuilder()
      .setTitle("Lovely Goats")
      .setImage(images[randomId].thumbnailLink);
    return client.channels.cache
      .get("1007408136778428459")
      .send({ embeds: [embed] });
  } catch (error) {
    return client.channels.cache.get("1007408136778428459").send(error.message);
  }
}

// When the client is ready, run this code (only once)
client.once("ready", async () => {
  await embedGoats();
  setInterval(async () => await embedGoats(), 1000 * 60 * 60);
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
