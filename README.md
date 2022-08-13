# A Goat Bot for Discord

This project has been created for fun but it can be used to protect Goat rights, create awareness for Goats and having information about them.

When you run it, you will have a Discord bot that sends you an embedded message that includes a Goat picture and the hyperlink of the source of the picture.

The search is doing by using [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/) a.k.a Google Custom Search.

In addition, [Discord.js](https://discord.js.org/#/) has been used for send messages into the specified channel.

## Requirements

- **Google Search Key**
- **Search Engine ID**
- **Discord Bot Token**

You can follow this [document](https://developers.google.com/custom-search/docs/tutorial/creatingcse) for **Google requirements**.

In addition, [this tutorial](https://discordpy.readthedocs.io/en/stable/discord.html) can be followed to obtain a **Discord Bot Token**.

## Environment Variables

Goats need these environment variables to show themselves:
|Name|Description|Default Value|
|----|-----------|-------------|
|GOOGLE_SEARCH_KEY|Google Programmable Search Engine Key|null|
|SEARCH_ENGINE_ID|Google Programmable Search Engin ID|null|
|DISCORD_BOT_TOKEN|Discord Bot token|null|
|DISCORD_CHANNEL_ID|The id of the Discord channel where the Goats will graze|null|

## Installation

To install dependencies run:

```bash
npm install
```

or

```bash
yarn
```

## Available Scripts

### `npm start`

It runs the project using [node](https://nodejs.org/api/cli.html#command-line-api).

### `npm start:dev`

It runs the project using [nodemon](https://www.npmjs.com/package/nodemon).
