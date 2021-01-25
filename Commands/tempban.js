module.exports = {
    name: "tempban",

    execute(message, args, bot) {
        if (!message.member.roles.cache.get('797599799074750513') || !message.member.hasPermission('ADMINISTRATOR')) {
            message.delete();
            message.reply('You do not have the permission to use the "tempban" command!');
            return;
        };
            

        //I just cleared all the previous comments, but now we are moving on to tempban.
        const Discord = require('discord.js');

        let person = message.guild.member(message.mentions.users.first());
        //the first thing we are going to add is a time variable, let's start by assuming it is args[2]
        let time = args[2];
        if (!person) return message.channel.send('You did not provide a GuildMember!');
        if (!person.bannable) return message.channel.send('I cannot tempban this person.');
        //you might also want to rename some of these messages
        if (person.id === message.author.id) return message.channel.send('You cannot tempban yourself!');
        //now we are going to mess with it in here.
        //This checks if it exists.
        if (!time) return message.channel.send('You must specify a time in days! (Ex: !tempban @Ferotiq#2857 1 They did something bad)');
        //now we are going to check if it is a number!
        if (isNaN(time)) return message.channel.send(`${args[2]} is not a number!`);
        //now we are going to parseFloat that into a number if we have gotten this far, (parseFloat converts a string into a number)
        if (!isNaN(time)) time = parseFloat(args[2]);
        //that is all we have to change up here.
        let reason = 'No reason specified';
        if (args[2]) reason = args.splice(3).join(" ");

        if (!person.user.bot) {
            //for here we need to change this to show the time they were banned for
            person.send(`You have been banned from this server for ${time} day(s) for ${reason}.`);
        }

        person.ban({
            reason: reason,
            //and we need to add the time into here!
            time: time
        });
        //all we have left for tempban is to change the embed
        const embed = new Discord.MessageEmbed()
            .setTitle('`Tempban:`')
            .setDescription(`\`Time:\` \`${time} day(s)\`, \`Reason:\` \`${reason}\``)
            .setAuthor(message.member.displayName)
            .setColor('ORANGE')
            .setThumbnail(person.user.avatarURL())
            .addFields({
                name: 'Member',
                value: person.toString(),
                inline: true
            }, {
                name: 'Member ID',
                value: person.id,
                inline: true
            })
            .setTimestamp();

        bot.channels.cache.get('725500766038655087').send(embed);
        //next is the kick command!
    }
}