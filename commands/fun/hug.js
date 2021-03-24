const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "hug",
    description: "Hugs a user.",
    category: 'fun',
    usage: ["hug @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let hugged = message.mentions.users.first()
        if (!hugged) return client.errorembed('You didnt mention a user.', message)
        const res = await fetch('https://some-random-api.ml/animu/hug');
        const img = (await res.json()).link;

        if (hugged.id === message.author.id) return client.errorembed('You cant hug your self.', message)
        if (hugged.bot) return client.errorembed('You cant hug a bot', message)

        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} hugs ${hugged.username}`)
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("cute")
        message.channel.send(embed)
    }
}