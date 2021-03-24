const Discord = require("discord.js")

module.exports = {
    name: "coinflip",
    aliases: ["cf"],
    description: "Flips a coin.",
    category: 'fun',
    usage: ["coinflip"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        var hort = [
            "Heads",
            "Tails"
        ]
        let randomIndex = Math.floor(Math.random() * hort.length);
        let hot = hort[randomIndex]
        let image;

        if (hot === "Heads") {
            image = "https://i.imgur.com/sZBWLhW.png"
        } else if (hot === "Tails") {
            image = "https://i.imgur.com/B95OR04.png"
        }

        let embed = new Discord.MessageEmbed()
            .setTitle("Coinflip")
            .setThumbnail(image)
            .setColor(client.ecolor)
            .setDescription(`I choose ${hort[randomIndex]}.`)
        message.channel.send(embed).catch(err => client.errorlog(err, message));
    }
} 