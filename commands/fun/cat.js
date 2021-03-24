const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "cat",
    description: "Gets a random picture of a cat from the internet.",
    category: 'fun',
    usage: ["cat"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const img = (await res.json())[0].url;

        const embed = new Discord.MessageEmbed()
            .setTitle('🐱 Cat')
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("cute")
        message.channel.send(embed);
    }
} 