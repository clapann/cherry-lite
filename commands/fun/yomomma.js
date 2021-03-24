const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "yomomma",
    description: "Get a yomomma joke at you or a user.",
    category: 'fun',
    usage: ["yomomma", "yomomma @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        const res = await fetch('https://api.yomomma.info');
        let joke = (await res.json()).joke;

        let embed = new Discord.MessageEmbed()
            .setTitle("Yo-momma joke")
            .setDescription(`${user}, ${joke}`)
            .setColor(client.ecolor)
        message.channel.send(embed)
    }
}