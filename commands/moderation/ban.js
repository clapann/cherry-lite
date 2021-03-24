const { MessageCollector } = require('discord.js')
module.exports = {
    name: "ban",
    description: "Bans a User.",
    category: 'moderation',
    usage: ['ban (user) (reason)'],
    botperms: ['embed_links', 'send_messages', 'ban_members'],
    userperms: '\`ban_members\`',
    run: async (client, message, args) => {

        const memberp = message.guild.member(message.author);
        if (!memberp.permissions.has("ADMINISTRATOR")) {
            return client.errorembed('Insufficient permissions.', message)
        } else if (!memberp.permissions.has("BAN_MEMBERS")) {
            return client.errorembed('Insufficient permissions.', message)
        }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args[1]
        if(!reason) reason = 'No reason provided'
        if(!member) return client.errorembed('Mention a user to ban.', message)
        
        if(member.user.id === message.author.id) return client.errorembed('You can\'t ban yourself.', message)
        if(!member.bannable) return client.errorembed('I can\'t ban that user.', message)

        message.channel.send( { embed: { description: `\`[⏲20s]\` Are you sure you want ban ${member}? \`[yes/no]\``, color: 'YELLOW' } } )

        const collector = new MessageCollector(message.channel, msg => msg.author.id === message.author.id, {
            time: 20000
        })

        collector.on('collect', msg => {
            switch(msg.content.toLowerCase()) {
                case "yes":
                    message.delete()
  					member.ban({ reason: `Responsible User: ${message.member.user.tag} | ${message.member.user.id}, Reason: ${reason}` })
                    .then(() => {
                        collector.stop('success');
                        return message.channel.send({embed:{description: `**Banned \`${member.user.tag} (${member.user.id}) for ${reason}.\`**`, color: 'GREEN', thumbnail: `${member.user.displayAvatarURL({dynamic:true})}`}})
                    }).catch(err => {
                        collector.stop('success');
                        if (err) return message.channel.send(`Error: \`${err}\``)
                    })
                break
                case "no":
                    message.delete()
                    message.channel.send(`Cancelled`)
                    collector.stop('success')
                break
                case "y":
                    message.delete()
                    member.ban(`Responsible User: ${message.member.user.tag} | ${message.member.user.id}, Reason: ${reason}`)
                    .then(() => {
                        collector.stop('success');
                        return message.channel.send({embed:{description: `**Banned \`${member.user.tag} (${member.user.id})\`**`, color: 'GREEN', thumbnail: `${member.user.displayAvatarURL({dynamic:true})}`}})
                    }).catch(err => {
                        collector.stop('success');
                        if (err) return message.channel.send(`Error: \`${err}\``)
                    })
                break
                case "n":
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
