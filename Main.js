//
// project owned by TobiasFeld22
// 2017
//
const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require('fs')
var commands = require('./commands.js')
var config = require('../config.js')
var prefix = "\\"
var content = fs.readFileSync("./blacklist.json");
var jcontent = JSON.parse(content);


bot.on('ready', () => {
console.log(`Bot ready, starting in ${bot.guilds.size} servers`)
bot.guilds.get(config.logguild).channels.get(config.logchannel).sendMessage("", {embed: {color: 0x99f2ff, title: "Bot restarted", description: "Bot had to restart", timestamp: bot.readyAt}});
bot.user.setGame(prefix +'help | Prolus')
})


bot.login(config.token)

bot.on("message", (message) => {
  if (message.author.bot){return};
  if (message.channel.type != "text") {return};
  if (!message.content.startsWith(prefix)) {return};
  if (jcontent.includes(message.author.id) == true){return}
  var inp = message.content.split(" ")
  if(inp[0] == prefix + 'ping'){commands.ping(message)}
  if(inp[0] == prefix + 'designs'){commands.designs(message, inp)}
  if(inp[0] == prefix + 'help' || inp[0] == "commands" || inp[0] == "cmds" || message.mentions.users.first() != undefined && message.mentions.users.first().id == bot.user.id){commands.help(message, inp, bot, prefix)}
  if(inp[0] == prefix + 'avatar'){commands.avatar(message, inp, prefix, bot)}
  if(inp[0] == prefix + 'restart'){commands.restart(message, bot)}
  if(inp[0] == prefix + 'hub'){commands.hub(message)}
  if(inp[0] == prefix + 'invite'){commands.invite(message)}
  if(inp[0] == prefix + 'server'){commands.server(message, inp, prefix, bot)}
  if(inp[0] == prefix + 'blacklist') {
    if (inp[1] == "add"){commands.blacklist_add(message, inp, prefix, bot)}
    if (inp[1] == "remove"){commands.blacklist_remove(message, inp, prefix, bot)}
  }
  if(inp[0] == prefix + 'submit'){commands.submit(message, bot)}
  if(inp[0] == prefix + 'about'){commands.about(message, bot)}
})
