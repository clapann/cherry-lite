const Discord = require("discord.js")

module.exports = {
    name: "pp",
    aliases: ["penis", "ppsize"],
    description: "Shows the users pp size.",
    category: 'fun',
    usage: ["pp", "pp @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        var size = [
            "8D",
            "8=D",
            "8==D",
            "8===D",
            "8====D",
            "8=====D",
            "8======D",
            "8=======D",
            "8========D",
            "8=========D",
        ]
        let randomIndex = Math.floor(Math.random() * size.length);
        let rsize = size[randomIndex]

        let embed = new Discord.MessageEmbed()
            .setTitle("pp size")
            .setDescription(`**${user.username}**'s pp size\n${rsize}`)
            .setColor(client.ecolor)
        message.channel.send(embed).catch(err => client.errorlog(err, message));
    }
}