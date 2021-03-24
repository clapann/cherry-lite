const { MessageCollector } = require('discord.js')
module.exports = {
    name: "kick",
    description: "Kicks a User.",
    category: 'moderation',
    usage: ['kick (user) (reason)'],
    botperms: ['embed_links', 'send_messages', 'kick_members'],
    userperms: '\`kick_members\`',
    run: async (client, message, args) => {
        const memberp = message.guild.member(message.author);
        if (!memberp.permissions.has("ADMINISTRATOR")) {
            return client.errorembed('Insufficient permissions.', message)
        } else if (!memberp.permissions.has("KICK_MEMBERS")) {
            return client.errorembed('Insufficient permissions.', message)
        }


        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args[1]
        if (!reason) reason = 'None provided'

        if (!member) return client.errorembed('Mention a user to kick.')
        if (member.user.id === message.author.id) return client.errorembed('You can\'t kick yourself.')
        if (!member.kickable) return client.errorembed('I can\'t kick that user.')

        message.channel.send({
            embed: {
                description: `\`[⏲20s]\` Are you sure you want kick ${member}? \`[yes/no]\``,
                color: 'YELLOW'
            }
        })

        const collector = new MessageCollector(message.channel, msg => msg.author.id === message.author.id, {
            time: 20000
        })

        collector.on('collect', msg => {
            switch (msg.content) {
                case "yes":
                    message.delete()
                    member.kick(`Responsible User: ${message.member.user.tag} | ${message.member.user.id}, Reason: ${reason}`)
                        .then(() => {
                            collector.stop('success');
                            return message.channel.send({
                                embed: {
                                    description: `**Kicked \`${member.user.tag} (${member.user.id})\`**`,
                                    color: 'GREEN'
                                }
                            })
                        }).catch(err => {
                            collector.stop('success');
                            if (err) return message.channel.send(`Error`)
                        })
                    break
                case "no":
                    message.delete()
                    message.channel.send(`Cancelled`)
                    collector.stop('success')
                    break
                default:
                    message.delete()
                    message.channel.send(`Cancelled`)
                    collector.stop('success')
            }
            collector.stop('success')
        })
        collector.on('end', (ignore, error) => {
            if (error && error !== "success") {
                return message.channel.send('**Timed out**')
            };
            collector.stop('success')
        });
    }
}
