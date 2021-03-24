const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "kiss",
    description: "Kissies a mentioned user.",
    category: 'fun',
    usage: ["kiss @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let user = message.mentions.users.first()
        if (!user) return client.errorembed('You didnt mention a user.', message)

        const res = await fetch('https://nekos.life/api/kiss');
        const img = (await res.json()).url;

        if (user.id === message.author.id) return client.errorembed('You cant kiss your self.', message)
        if (user.bot) return client.errorembed('You cant kiss a bot.', message)

        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} kisses ${user.username}`)
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("cute")
        message.channel.send(embed)
    }
} 