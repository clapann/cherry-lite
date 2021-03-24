const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "cry",
    description: "Cries.",
    category: 'fun',
    usage: ["cry"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const res = await fetch('https://shiro.gg/api/images/cry');
        const img = (await res.json()).url;

        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author} cries`)
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter(":'(")
        message.channel.send(embed)
    }
} 