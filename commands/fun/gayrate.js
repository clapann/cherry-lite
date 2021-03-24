const Discord = require("discord.js")
module.exports = {
    name: "gayrate",
    description: "Shows how gay you are.",
    category: 'fun',
    usage: ["gayrate", "gayrate @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let random = Math.floor(Math.random() * 100) + 1;
        let gayrate = `${random}%`

        let embed = new Discord.MessageEmbed()
            .setTitle("gayrate")
            .setColor(client.ecolor)

        if (user === message.author) {
            embed.setDescription(`You are ${gayrate} gay :gay_pride_flag:`)
        } else {
            embed.setDescription(`${user.username} is ${gayrate} gay :gay_pride_flag:`)
        }
        message.channel.send(embed).catch(err => client.errorlog(err, message));
    }
}