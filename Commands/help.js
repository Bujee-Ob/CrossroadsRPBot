// So the first thing we have to do is just make all of the basic command stuff
// We'll need message, args, and bot (bot for the command handler, if using discord.js documentation one, you only need message, args)
// We'll need the discord.js library for the embeds.
const Discord = require('discord.js');

module.exports = {
    // Put all the stuff you want in your help embed here, on every command
    name: "help",
    aliases: ["help", "h"],
    description: "Shows a help embed",

    execute(message, args, bot){
    
        // First we are going to make a few if statements to make sure that we want to send the right things
        // In this help command we are going to have !help do all of the commands, and !help <command> to get information on just one command.

        // This is just for !help
        if (!args[1]) {

            // Make sure you use your command handler here
            // const helpArray = bot.commands
            // .map(value => `**Name:** \`${value.name}\`, **Aliases:** \`${value.aliases.join(", ") /*The aliases is going to be an array*/}\`, **Description:** \`${value.description}\``)

            'UNCOMMENT THE THING ABOVE IF YOU WANT TO USE IT AND PUT THE STUFF BELOW IN COMMENTS'

            // This .map will be used if you want more properties on your commands, ex: aliases and description to show on the main help command (not recommended)
            // You can have it so that it just lists the names, so im going to do that now (below)

            // New array
            const helpArray = [];

            // This will just show the names of the command when you run it.
            bot.commands.forEach(command => {
                helpArray.push(command.name);
            });

            // Creating the embed
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}: Help`)
                .setAuthor(message.member.displayName)
                .setColor('BLUE')
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()
                .addField('Commands:', helpArray)
                .setFooter('Bujee Customs');

            // Sending the embed
            // If you also want to send this in DMs, do "message.author.send(helpEmbed)"
            message.channel.send(helpEmbed);

            // This is for !help <command>
        } else {

            // Making sure that what they enter is a command or one of its aliases
            if (!bot.commands.find(command => command.aliases.includes(args[1]))) return message.channel.send(`${args[1]} is not a command!`);

            // Storing the command file into a variable
            const helpIndividualCommand = bot.commands.find(command => command.aliases.includes(args[1]))

            // Creating the embed (change how you like)
            const helpIndividualEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}: Help`)
                .setAuthor(message.member.displayName)
                .setDescription(`Information on the ${helpIndividualCommand.name} command:`)
                .setColor('BLUE')
                .setThumbnail(message.author.avatarURL())
                .addFields(
                    // Add more or less of these fields for more or less things you have in your module.exports
                    { name: 'Name:', value: helpIndividualCommand.name, inline: true },
                    { name: 'Description:', value: helpIndividualCommand.description, inline: true },
                    { name: 'Aliases:', value: helpIndividualCommand.aliases.join(", "), inline: true }
                )
                .setTimestamp()
                .setFooter('Bujee Customs');
                
                // Sending the embed
                message.channel.send(helpIndividualEmbed);
        }
    }
}