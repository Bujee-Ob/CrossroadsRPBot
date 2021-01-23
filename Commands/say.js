module.exports = {
    name: "say",

    execute(message, args, bot) {
        if (!message.member.roles.cache.get('797636936495136789') || !message.member.hasPermission('ADMINISTRATOR')) {
            message.delete();
            message.reply('You do not have the permission to use the "say" command!');
            return;
        };
            
            if (!args[1]) return message.channel.send('What do you want to say?');
            let say = args.splice(1).join(" ")
            const channel = bot.channels.cache.get('')
            message.channel.send(say)
    }
}