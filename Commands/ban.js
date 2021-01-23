module.exports = {
    name: "ban",
    aliases: ["ban", "b"],
    description: "Bans a member",

    execute(message, args, bot) {
            if (!message.member.roles.cache.get('797636936495136789') || !message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have the permission to use the "ban" command!');
                return;
            };

        //the first one im going to do is a simple ban command
        //I am actually going to use a lot of error handling and stuff though. (this is for all the others too)

        //first we need to require discord (if you plan on using embeds)
        const Discord = require('discord.js');
    
        //now we need to make a variable for the person we want to ban.
        let person = message.guild.member(message.mentions.users.first());
        //that gets the GuildMember property of the first mentioned user.
        //next lets check if that exists.
        if (!person) return message.channel.send('You did not provide a GuildMember!');
        //next we are going to check if the bot can ban them!
        if (!person.bannable) return message.channel.send('I cannot ban this person.');
        //next we are going to check if you are trying to ban yourself!
        if (person.id === message.author.id) return message.channel.send('You cannot ban yourself!');
        //next we are going to make a few lines regarding reason.
        //We are going to start with assuming they didn't say a reason.
        let reason = 'No reason specified';
        //this will change the variable to the reason if they supply one
        if (args[2]) reason = args.splice(2).join(" ");
        //anyways, now we are going to check if the person we are going to ban is a bot, and if not, send a message to them.

        if (!person.user.bot) {
            person.send(`You have been banned from this server for ${reason}.`);
        }
        //now we are actually going to ban them!
        person.ban({
            reason: reason
        });

        //now I am going to make an embed and send it to a logging channel.

        const embed = new Discord.MessageEmbed()
            .setTitle('`Ban:`')
            .setDescription(`\`Reason:\` \`${reason}\``)
            .setAuthor(message.member.displayName)
            .setColor('RED')
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

        //and that's it for ban! (we are going to copy and paste for the others and change only a few things). The reason I am typing the embed like this, is because I'm trying to make it like Beautify.
        //beautify is an extension that you can install like that, and if you right click and select 'Format Document' it makes your code neat. So I use it a lot.
    }
}