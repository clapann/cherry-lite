const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "slap",
    description: "Slaps a mentioned user.",
    category: 'fun',
    usage: ["slap @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let user = message.mentions.users.first()
        if (!user) return client.errorembed('You didnt mention a user.', message)

        const res = await fetch('https://nekos.life/api/v2/img/slap');
        const img = (await res.json()).url;

        if (user.bot) return client.errorembed('You cant slap a bot.', message)

        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} slaps ${user.username}`)
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("ouch")
        message.channel.send(embed)
    }
}