const Discord = require("discord.js")

module.exports = {
    name: "say",
    description: "Says what you say.",
    category: 'misc',
    usage: ["say (text)"],
    botperms: ['send_messages'],
    userperms: 'None',
    run: async (client, message, args, ) => {
        message.delete().catch(err => console.log(''))
        message.channel.send(args.join(' '))
    }
} 