const { joinVoiceChannel } = require("@discordjs/voice");

function voiceConnectionGenerator(channel) {
  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guildId,
      adapterCreator: channel.voiceAdapterCreator,
    });
    return connection;
  } catch (error) {
    throw error;
  }
}

module.exports = { voiceConnectionGenerator };
