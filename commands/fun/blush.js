const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "blush",
    description: "Blushes.",
    category: 'fun',
    usage: ["blush"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const res = await fetch('https://shiro.gg/api/images/blush');
        const img = (await res.json()).url;

        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} blushes`)
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter(":3")
        message.channel.send(embed)
    }
} 