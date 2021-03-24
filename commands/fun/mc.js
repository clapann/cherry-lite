const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "mc",
    description: "Generates a minecraft achievement.",
    category: 'fun',
    usage: ["mc (text)"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let text = args.join(' ')
        if (!text) return client.errorembed('You didnt define any text.')

        if (text.length > 25) {
            return client.errorembed('You cannot use more than 25 characters.')
        }

        var replaced = require('querystring').escape(text);
        let attachment = new Discord.MessageAttachment(`https://api.iapetus11.me/mc/achievement/${replaced}`, "mc.png");
        message.channel.send("", attachment)
    }
} 