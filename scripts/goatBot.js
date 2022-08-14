const { searchGoats } = require("./searchGoats");
const { randomIdGenerator } = require("../utils/randomIdGenerator");
const { embedGenerator } = require("../utils/embedGenerator");
const dotenv = require("dotenv");
const { searchGoatSongs } = require("./searchGoatSongs");
const { audioPlayerGenerator } = require("../utils/audioPlayerGenerator");
dotenv.config();

const { DISCORD_CHANNEL_ID } = process.env;

async function goatBot(client, botType = "image") {
  try {
    let embed;
    const randomId = randomIdGenerator();
    const searchIndex = parseInt(Math.floor(Math.random() * 100));
    const channelInfo = client.channels.cache
      .map((channel) => {
        return {
          name: channel.guild.name,
          guildId: channel.guild.id,
          channelId: channel.id,
          voiceAdapterCreator: client.guilds.cache.get(channel.guild.id)
            .voiceAdapterCreator,
        };
      })
      .filter((channel) => channel.name === "Goatserver")[0];
    if (botType === "image") {
      const items = await searchGoats(searchIndex);
      if (!items) {
        goatBot(client, botType);
      }
      const {
        title,
        image: { contextLink, thumbnailLink },
      } = items[randomId];
      embed = embedGenerator(title, contextLink, thumbnailLink);
    } else {
      const goatSong = await searchGoatSongs(
        searchIndex > 50 ? searchIndex - 50 : searchIndex
      );
      const { preview_url, artists, name, images } = goatSong;
      audioPlayerGenerator(preview_url, name, channelInfo);
      embed = embedGenerator(name, preview_url, images[0].url);
    }

    return client.channels.cache.get(DISCORD_CHANNEL_ID).send({
      embeds: [embed],
    });
  } catch (error) {
    return client.channels.cache
      .get(DISCORD_CHANNEL_ID)
      .send(error.message + " " + error.stack);
  }
}

module.exports = { goatBot };
