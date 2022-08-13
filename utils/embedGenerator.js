const { EmbedBuilder } = require("discord.js");

function embedGenerator(title, link, image) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Hourly Lovely Goats")
    .setDescription(`[${title}](${link})`)
    .setTimestamp()
    .setImage(image);
  return embed;
}
module.exports = { embedGenerator };
