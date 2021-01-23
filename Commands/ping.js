module.exports = {
    name: "ping",
    aliases: ["ping", "p"],
    description: "Sees the ping of the member",


    execute(message) {
        message.channel.send('Pinging...').then(pingMessage => {

            const start = message.createdTimestamp;
            const end = pingMessage.createdTimestamp;
            const subtraction = end - start;

            pingMessage.edit(`Your ping is ${subtraction} ms.`);
        });
    }
}