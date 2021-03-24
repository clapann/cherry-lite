const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "fox",
    description: "Sends a random picture of a fox.",
    category: 'fun',
    usage: ["fox"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const res = await fetch('https://some-random-api.ml/img/fox');
        const img = (await res.json()).link;

        const embed = new Discord.MessageEmbed()
            .setTitle('🦊 Fox')
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("cute")
        message.channel.send(embed);
    }
}