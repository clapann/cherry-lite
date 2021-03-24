const Discord = require('discord.js');

module.exports = {
    name: 'serveravatar',
    aliases: ['serverav'],
    description: 'Get the current guilds avatar.',
    category: 'utility',
    usage: ['serveravatar'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(message.guild.name)
            .setImage(message.guild.iconURL({
                dynamic: true,
                size: 1024
            }))
            .setColor(client.ecolor)
        message.channel.send(embed)
    }
}