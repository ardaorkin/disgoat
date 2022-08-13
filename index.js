const { Client, GatewayIntentBits } = require("discord.js");
var cron = require("node-cron");
const dotenv = require("dotenv");
const { goatBot } = require("./goatBot");
dotenv.config();

const { DISCORD_BOT_TOKEN } = process.env;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  await goatBot(client);
  const task = cron.schedule("0 * * * *", async () => {
    await goatBot(client);
  });
  task.start();
});

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);
