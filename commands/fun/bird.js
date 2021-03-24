const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "bird",
    description: "Sends a random picture of a bird.",
    category: 'fun',
    usage: ["bird"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const res = await fetch('https://some-random-api.ml/img/birb');
        const img = (await res.json()).link;

        const embed = new Discord.MessageEmbed()
            .setTitle('🐦 Bird')
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("cute")
        message.channel.send(embed);
    }
}