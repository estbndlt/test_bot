require("dotenv").config();

const fetch = require("node-fetch");
const { Client } = require("discord.js");
const { text } = require("express");
const client = new Client();

const DEFAULT_CHANNEL = "estebot";
const PREFIX = "$";

const PING_CMD = `ping`;
const INSPIRE_CMD = `inspire`;
const INSPIRE_RSP = `you got this bitch`;
const COMFORT_CMD = `comfort`;
const COMFORT_RSP = `there there dumbass`;
const KANYE_CMD = `kanye`;
const RON_CMD = `ron`;
const CAT_CMD = `cat`;
const GEEK_JOKE_CMD = `geekjoke`;
const DAD_JOKE_CMD = `dadjoke`;
const OFFICE_CMD = `office`;
const MAGIC_8BALL_CMD = `8ball`;
const HELP_CMD = `help`;
const HELP_RSP = `
Start the command with the prefix ${PREFIX}

Commands:
  - ${PING_CMD} - test latency
  - ${INSPIRE_CMD} - get an inspirational quote to fuck the shit outta the market
  - ${COMFORT_CMD} - get a comforting quote because the market fucked you
  - ${KANYE_CMD} - get a comforting kanye quote
  - ${RON_CMD} - get a comforting ron swanson quote
  - ${CAT_CMD} - get a comforting cat picture
  - ${GEEK_JOKE_CMD} - get a comforting nerd joke
  - ${DAD_JOKE_CMD} - get a comforting dad joke
  - ${OFFICE_CMD} - get a comforting the office quote
  - ${MAGIC_8BALL_CMD} - get a comforting answer from the 8ball gods`;

// Create an event listener for new guild members
client.on("guildMemberAdd", (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === DEFAULT_CHANNEL
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to poor investment decisions, ${member}!`);
});

// parse for key words
client.on("message", (message) => {
  if (message.author.bot) return;

  message.content = message.content.toLowerCase();

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

  if (message.content === "bad bot") {
    var channel = client.channels.cache.find(
      (channel) => channel.name === DEFAULT_CHANNEL
    );

    if (channel) {
      message.content = ":'(((((";
      channel.send(message);
    } else {
      message.guild.channels.create(DEFAULT_CHANNEL);
    }
  }

  if (message.content === "good bot") {
    var channel = client.channels.cache.find(
      (channel) => channel.name === DEFAULT_CHANNEL
    );

    if (channel) {
      message.content = "! :DDD !!!!";
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

  const [CMD_RAW, ...ARGS_RAW] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  const CMD = CMD_RAW.toLowerCase();
  const ARGS = ARGS_RAW.map((arg) => arg.toLowerCase());

  if (CMD === PING_CMD) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (CMD === INSPIRE_CMD) {
    message.reply(INSPIRE_RSP);
  } else if (CMD === COMFORT_CMD) {
    message.reply(COMFORT_RSP);
  } else if (CMD === HELP_CMD) {
    message.reply(HELP_RSP);
  } else if (CMD === KANYE_CMD) {
    const { quote } = await fetch("https://api.kanye.rest").then((res) =>
      res.json()
    );

    message.channel.send(quote.concat(" - Kanye West"));
  } else if (CMD === RON_CMD) {
    const ron = await fetch(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    )
      .then((res) => res.text())
      .then((text) => text.split(/[\[|\]]/)[1])
      .then((text) => text.concat(" - Ron Swanson"));

    message.channel.send(ron);
  } else if (CMD === CAT_CMD) {
    // https://discordjs.guide/additional-info/rest-api.html#using-node-fetch
    const { file } = await fetch("https://aws.random.cat/meow").then((rsp) =>
      rsp.json()
    );

    message.channel.send(file);
  } else if (CMD === GEEK_JOKE_CMD) {
    // https://github.com/sameerkumar18/geek-joke-api
    const { joke } = await fetch(
      "https://geek-jokes.sameerkumar.website/api?format=json"
    ).then((rsp) => rsp.json());

    message.channel.send(joke);
  } else if (CMD === DAD_JOKE_CMD) {
    const { joke } = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    }).then((rsp) => rsp.json());

    message.channel.send(joke);
  } else if (CMD === OFFICE_CMD) {
    // https://www.officeapi.dev
    const { content, character } = await fetch(
      "https://www.officeapi.dev/api/quotes/random"
    )
      .then((rsp) => rsp.json())
      .then((rsp) => rsp.data);

    message.channel.send(
      content.concat(` - ${character.firstname} ${character.lastname}`)
    );
  } else if (CMD === MAGIC_8BALL_CMD) {
    // https://8ball.delegator.com
    let params = encodeURIComponent(ARGS.join(" "));
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;

    const { answer } = await fetch(uri)
      .then((rsp) => rsp.json())
      .then((rsp) => rsp.magic);

    message.channel.send(answer);
  } else {
    // unknown command
    message.channel.send("beep boop boop beep, fuck off m8 :)");
  }
});

client.once("ready", () => {
  console.log(`${client.user.username} has logged in`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
