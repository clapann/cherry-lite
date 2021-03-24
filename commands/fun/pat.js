const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "pat",
    description: "Pats a mentioned user.",
    category: 'fun',
    usage: ["pat @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let user = message.mentions.users.first()
        if(!user) return client.errorembed('You didnt mention a user.', message)

        const res = await fetch('https://nekos.life/api/pat');
        const img = (await res.json()).url;
        
        if(user.bot) return client.errorembed('You cant pat your self.', message)

        let embed = new Discord.MessageEmbed()
        .setDescription(`${message.author.username} pats ${user.username}`)
        .setImage(img)
        .setColor(client.ecolor)
        .setFooter("cute")
        message.channel.send(embed)
    }
}