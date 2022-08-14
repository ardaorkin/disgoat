const { searchGoats } = require("./searchGoats");
const { randomIdGenerator } = require("../utils/randomIdGenerator");
const { embedGenerator } = require("../utils/embedGenerator");
const dotenv = require("dotenv");
const { searchGoatSongs } = require("./searchGoatSongs");
const { audioPlayerGenerator } = require("../utils/audioPlayerGenerator");
dotenv.config();

const { DISCORD_CHANNEL_ID, DEBUG } = process.env;

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
      const {
        items,
        error: { details },
      } = await searchGoats(searchIndex);
      if (!items && !details) {
        setTimeout(() => {
          console.log("Search result is null. It will be tried again.");
          return goatBot(client, botType);
        }, 10000);
      }
      if (details) {
        return client.channels.cache
          .get(DISCORD_CHANNEL_ID)
          .send("Goats migrated :( But don't worry, they will back!");
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
      const { preview_url, spotify, name, images } = goatSong;
      // audioPlayerGenerator(preview_url, name, channelInfo);
      embed = embedGenerator(
        `Listen it in spotify!\n${name}`,
        spotify,
        images[0].url
      );
    }

    return client.channels.cache.get(DISCORD_CHANNEL_ID).send({
      embeds: [embed],
    });
  } catch (error) {
    if (DEBUG) {
      return client.channels.cache
        .get(DISCORD_CHANNEL_ID)
        .send(error.message + " " + error.stack);
    } else {
      console.log(error);
    }
  }
}

module.exports = { goatBot };
