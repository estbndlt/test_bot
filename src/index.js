require("dotenv").config();

// const tdaclient = require("tda-api-client");
const fetch = require("node-fetch");
const { Client } = require("discord.js");
const { text } = require("express");
const client = new Client();

const DEFAULT_CHANNEL = "estebot";
const PREFIX = "!";

const PING_CMD = `ping`;
const INSPIRE_CMD = `inspire`;
const INSPIRE_RSP = `you got this`;
const COMFORT_CMD = `comfort`;
const COMFORT_RSP = `there there`;
const TD_CMD = `orders`;
const KANYE_CMD = `kanye`;
const RON_CMD = `ron`;
const CAT_CMD = `cat`;
const GEEK_JOKE_CMD = `geekjoke`;
const DAD_JOKE_CMD = `dadjoke`;
const HELP_CMD = `help`;
const HELP_RSP = `
Commands:
  - ${PING_CMD} - test latency
  - ${INSPIRE_CMD} - get an inspirational quote to fuck the shit outta the market
  - ${COMFORT_CMD} - get a comforting quote because the market fucked you`;

// const configGetAcct = {
//   accountId: 1,
//   fields: "positions,orders",
//   authConfig: {
//     refresh_token: process.env.TD_REFRESH_TOKEN,
//     client_id: process.env.TD_CONSUMER_KEY_LONG,
//   },
// };

// const getAcctResult = async () => {
//   const result = await tdaclient.accounts.getAccount(configGetAcct);

//   console.log(result);
//   return result;
// };

// Create an event listener for new guild members
client.on("guildMemberAdd", (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === DEFAULT_CHANNEL
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

// parse for key words
client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.content === "cool") {
    var channel = client.channels.cache.find(
      (channel) => channel.name === DEFAULT_CHANNEL
    );

    if (channel) {
      message.content = "cool cool cool";
      channel.send(message);
    } else {
      message.guild.channels.create(DEFAULT_CHANNEL);
    }
  }
});

// parse commands
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  // check for the bot channel
  if (message.channel.name != DEFAULT_CHANNEL) {
    message.delete();

    var channel = client.channels.cache.find(
      (channel) => channel.name === DEFAULT_CHANNEL
    );

    if (channel) {
      // reroute the channel to respond in the bot channel
      message.channel = channel;

      message.reply(
        "Hey! Talk to me over here hoe! Stop bothering these nice people."
      );
    } else {
      message.guild.channels.create(DEFAULT_CHANNEL);
    }

    return;
  }

  const [CMD, ...ARGS] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  if (CMD === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  if (CMD === INSPIRE_CMD) {
    message.reply(INSPIRE_RSP);
  }

  if (CMD === COMFORT_CMD) {
    message.reply(COMFORT_RSP);
  }

  if (CMD === HELP_CMD) {
    message.reply(HELP_RSP);
  }

  if (CMD === TD_CMD) {
    // const result = tdaclient.accounts.getAccount(configGetAcct);
    // message.reply(result);
  }

  if (CMD === KANYE_CMD) {
    const { quote } = await fetch("https://api.kanye.rest").then((res) =>
      res.json()
    );

    message.channel.send(quote.concat(" - Kanye West"));
  }

  if (CMD === RON_CMD) {
    const ron = await fetch(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    )
      .then((res) => res.text())
      .then((text) => text.split(/[\[|\]]/)[1])
      .then((text) => text.concat(" - Ron Swanson"));

    message.channel.send(ron);
  }

  if (CMD === CAT_CMD) {
    // https://discordjs.guide/additional-info/rest-api.html#using-node-fetch
    const { file } = await fetch("https://aws.random.cat/meow").then((rsp) =>
      rsp.json()
    );

    message.channel.send(file);
  }

  if (CMD === GEEK_JOKE_CMD) {
    // https://github.com/sameerkumar18/geek-joke-api
    const { joke } = await fetch(
      "https://geek-jokes.sameerkumar.website/api?format=json"
    ).then((rsp) => rsp.json());

    message.channel.send(joke);
  }

  if (CMD === DAD_JOKE_CMD) {
    const { joke } = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    }).then((rsp) => rsp.json());

    message.channel.send(joke);
  }
});

client.once("ready", () => {
  console.log(`${client.user.username} has logged in`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
