const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "pikachu",
    description: "Sends a random picture of pikachu.",
    category: 'fun',
    usage: ["pikachu"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const res = await fetch('https://some-random-api.ml/img/pikachu');
        const img = (await res.json()).link;

        const embed = new Discord.MessageEmbed()
            .setTitle('Pikachu')
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("cute")
        message.channel.send(embed);
    }
}