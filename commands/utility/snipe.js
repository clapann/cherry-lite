const Discord = require("discord.js")

module.exports = {
    name: "snipe",
    description: "Shows the last deleted message within the last 3 minutes",
    category: 'utility',
    usage: ['snipe'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        if (message.channel.snipeMessage) {

            let user = client.users.cache.get(message.channel.snipeUser)

            let embed = new Discord.MessageEmbed()
                .setDescription(`${message.channel.snipeMessage}`)
                .setTimestamp(message.channel.snipeTime)
                .setColor(client.ecolor)
                .setFooter('Deleted:')
            if (user) {
                embed.setAuthor(`${user.tag}`, user.avatarURL({
                    dynamic: true,
                    size: 1024
                }))
            } else {
                embed.setAuthor(`Deleted User#0000`)
            }
            message.channel.send(embed)
        } else {
            client.errorembed('Nothing has been deleted in this channel in the past 3 minutes.', message)
        }
    }
}