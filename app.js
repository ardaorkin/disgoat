const { Client, GatewayIntentBits } = require("discord.js");
var cron = require("node-cron");
const dotenv = require("dotenv");
const { goatBot } = require("./scripts/goatBot");
dotenv.config();

const { DISCORD_BOT_TOKEN } = process.env;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  await goatBot(client, "image");
  const task1 = cron.schedule("0 * * * *", async () => {
    await goatBot(client);
  });
  const task2 = cron.schedule("30 * * * *", async () => {
    await goatBot(client);
  });
  task1.start();
  task2.start();
});

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);
