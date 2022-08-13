const { EmbedBuilder } = require("discord.js");
const { searchGoats } = require("./searchGoats");
const dotenv = require("dotenv");
dotenv.config();

const { DISCORD_CHANNEL_ID } = process.env;

async function goatBot(client) {
  try {
    const items = await searchGoats();
    const randomId =
      parseInt(
        new Date().toLocaleTimeString("tr-TR", {
          timeZone: "America/New_York",
          hour: "numeric",
        })
      ) % 10;

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

module.exports = { goatBot };
