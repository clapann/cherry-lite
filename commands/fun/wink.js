const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "wink",
    description: "Winks at a user.",
    category: 'fun',
    usage: ["wink @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let winked = message.mentions.users.first()
        if (!winked) return client.errorembed('You didnt mention a user.', message)
        const res = await fetch('https://some-random-api.ml/animu/wink');
        const img = (await res.json()).link;

        if (winked.id === message.author.id) return client.errorembed('You cant wink at your self.', message)

        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} winks at ${winked.username}`)
            .setImage(img)
            .setColor(client.ecolor)
            .setFooter("wink wink")
        message.channel.send(embed)
    }
}