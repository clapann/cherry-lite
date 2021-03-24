const Discord = require("discord.js")

module.exports = {
    name: "editsnipe",
    description: "Shows the last edited message within the last 3 minutes",
    category: 'utility',
    usage: ['editsnipe'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        if (message.channel.editMessage) {

            let user = client.users.cache.get(message.channel.editUser)

            let embed = new Discord.MessageEmbed()
                .setDescription(`${message.channel.editMessage}`)
                .setTimestamp(message.channel.editTime)
                .setColor(client.ecolor)
                .setFooter('Edited:')
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
            client.errorembed('Nothing has been edited in this channel in the past 3 minutes.', message)
        }
    }
}