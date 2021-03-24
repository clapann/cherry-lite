const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    description: 'Get a users avatar.',
    category: 'utility',
    usage: ['avatar', 'avatar @user'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || message.author;
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${user.tag}`, user.displayAvatarURL({
                dynamic: true
            }))
            .setTitle(`Avatar`)
            .setImage(user.avatarURL({
                dynamic: true,
                size: 1024
            }))
            .setColor(client.ecolor)
            .setDescription(`
Open as:
- [png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})
- [jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})
- [webp](${user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })})
`)
        message.channel.send(embed)
    }
}
