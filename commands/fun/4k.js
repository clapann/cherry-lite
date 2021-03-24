const Discord = require("discord.js")

module.exports = {
    name: "4k",
    description: "Catch a user lacking in 4k.",
    category: 'fun',
    usage: ["4k @user"],
    botperms: ['attach_files', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        message.channel.send(message.mentions.users.first() || '', {
            files: [`https://media1.tenor.com/images/0965dcb3bfe270f1e3dd17524d0c14cc/tenor.gif`]
        })
    }
}