const Discord = require('discord.js');

module.exports = {
    name: 'membercount',
    aliases: ['members'],
    description: 'Check how many members are in the current guild.',
    category: 'utility',
    usage: ['membercount'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        let guild = message.guild
        let bot = 0
        let users = 0
        let total = 0

        guild.members.cache.forEach(member => {
            total = total + 1
            if (member.user.bot) {
                bot = bot + 1
            } else {
                users = users + 1
            }
        })

        let embed = new Discord.MessageEmbed()
            .addField(`Users`, `[${users}](https://cherrybot.xyz "The amount of users in the guild")`, true)
            .addField(`Bots`, `[${bot}](https://cherrybot.xyz "The amount of bots in the guild")`, true)
            .addField(`Total`, `[${total}](https://cherrybot.xyz "The total amount of bots and users in the guild")`, true)
            .setFooter('Hover for more info')
            .setColor(client.ecolor)
        message.channel.send(embed)
    }
}