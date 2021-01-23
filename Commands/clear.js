module.exports = {
    name: "clear",
    aliases: ["clear", "c"],
    description: "Clears chat",

    execute(message, args) {
        if (!message.member.roles.cache.get('797636936495136789') || !message.member.hasPermission('ADMINISTRATOR')) {
            message.delete();
            message.reply('You do not have the permission to use the "clear" command!');
            return;
        };
        if (!args[1]) return message.channel.send('How many messages do you want to clear? (You provided none!)');
        if (isNaN(args[1])) return message.channel.send(`${args[1]} is not a number!`);
        message.channel.bulkDelete(args[1]);
    }
}