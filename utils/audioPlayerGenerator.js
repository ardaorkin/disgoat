const { createReadStream } = require("node:fs");
const { join } = require("node:path");
const {
  createAudioResource,
  createAudioPlayer,
  getVoiceConnection,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const { voiceConnectionGenerator } = require("./voiceConnectionGenerator");

function audioPlayerGenerator(resourceUrl, audioTitle, channel) {
  try {
    const player = createAudioPlayer();
    let resource = createAudioResource(resourceUrl, {
      inlineVolume: true,
      metadata: {
        title: audioTitle,
      },
    });
    resource.volume.setVolume(0.5);

    voiceConnectionGenerator(channel);
    const connection = getVoiceConnection(channel.guildId);
    connection.subscribe(player);
    player.play(resource);
    player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
      console.log(
        "The audio player has started playing on " + channel.name + "! "
      );
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { audioPlayerGenerator };
