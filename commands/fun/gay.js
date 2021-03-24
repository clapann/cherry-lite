const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "gay",
    description: "Puts rainbow over a users avatar.",
    category: 'fun',
    usage: ["gay", "gay @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || message.author;
        let url = user.displayAvatarURL()

        if (url.includes(".webp") || url.includes(".gif")) {
            url = url.split('.webp').join(".png")
        }

        message.channel.send("", {
            files: [`https://some-random-api.ml/canvas/gay?avatar=${url}`]
        })
    }
}