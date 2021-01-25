const Discord = require('discord.js');
const bot = new Discord.Client();

const { prefix, token } = require('./Data/config.json');

const fs = require ('fs');

bot.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandfiles){
  const command = require(`./Commands/${file}`);
  bot.commands.set(command.name, command);
};

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");
  
  // Uncomment below line if your bot REQUIRES GUILD DATA
  // if (!message.guild) return message.reply('DMs are not enabled');
  
  if (message.author.bot) return;
  // Add prefixless commands here (see second video)
  if (!message.content.startsWith(prefix)) return;
  
  switch(args[0]) {
      case 'clear':
        bot.commands.get('clear').execute(message, args);
          break;   
        case 'say':
          bot.commands.get('say').execute(message, args, bot);
           break;
           case 'ban':
            bot.commands.get('ban').execute(message, args, bot);
            break;
        case 'tempban':
            bot.commands.get('tempban').execute(message, args, bot);
            break;
        case 'kick':
            bot.commands.get('kick').execute(message, args, bot);
            break;
        case 'help':
            // I found this cool thing that I'll use here, it's a feature to have multiple conditions for a switch case, so your commands can have aliases like for help i'll do help and h
            bot.commands.get('help').execute(message, args, bot);
            break;
       case 'twitter':
              bot.commands.get('twitter').execute(message);
              break;
          case 'dog':
             const attachment = new Discord.MessageAttachment ('https://media0.giphy.com/media/OnQqgkPWJ17DG/giphy.gif');
              message.channel.send(attachment);
              break;
      case 'cat':
               const attachment2 = new Discord.MessageAttachment('https://media4.giphy.com/media/WXB88TeARFVvi/giphy.gif?cid=ecf05e47qv3agf5e63f8ky2gw5qmghs9upgezvafuecr8tfq&rid=giphy.gif');
                message.channel.send(attachment2);
                break;
        case 'ping':
          bot.commands.get('ping').execute(message);
          break;
          case 'reporet':
            const {MessageEmbed} = require("discord.js");
            bot.commands.get('reporet').execute(bot, message, args);
            break;
        }
    }
)

bot.login(token)