const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "dog",
    description: "Gets a random picture of a dog from the internet.",
    category: 'fun',
    usage: ["dog"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const res = await fetch('https://api.thedogapi.com/v1/images/search');
        const img = (await res.json())[0].url;

        const embed = new Discord.MessageEmbed()
            .setTitle('🐶 Dog')
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("cute")
        message.channel.send(embed);
    }
} 