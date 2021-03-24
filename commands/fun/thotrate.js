const Discord = require("discord.js")

module.exports = {
    name: "thotrate",
    aliases: ['thot'],
    description: "Shows how much of a thot a user is.",
    category: 'fun',
    usage: ["thot", "thot @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let random = Math.floor(Math.random() * 100) + 1;
        let thorate = `${random}%`

        let embed = new Discord.MessageEmbed()
            .setTitle("thorate")
            .setColor(client.ecolor)

        if (user === message.author) {
            embed.setDescription(`You are ${thorate} a thot :smirk:`)
        } else {
            embed.setDescription(`${user.username} is ${thorate} a thot :smirk:`)
        }
        message.channel.send(embed).catch(err => client.errorlog(err, message));
    }
}