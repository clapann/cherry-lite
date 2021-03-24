const Discord = require("discord.js")
const ms = require('parse-ms');

module.exports = {
    name: "nuke",
    description: "Nuke a channel.",
    category: 'moderation',
    usage: ['nuke'],
    botperms: ['embed_links', 'send_messages', 'manage_channels'],
    userperms: '\`ADMINISTRATOR\`',
    hascooldown: true,
    run: async (client, message, args) => {
        const member = message.guild.member(message.author);
        if (!member.permissions.has("ADMINISTRATOR")) {
            return client.errorembed('Insufficient permissions.', message)
        }

        let cooldown = 5 * 60 * 1000;

        if (cooldown - (Date.now() - message.author.nukeCooldown) > 0) {
            let timeObj = ms(cooldown - (Date.now() - message.author.nukeCooldown));
            let embed = new Discord.MessageEmbed()
                .setTitle(":x: Error")
                .setDescription(`${message.author.username}, please wait \`${timeObj.minutes}\` minute(s) and \`${timeObj.seconds}\` more second(s) before reusing the \`nuke\` command.`)
                .setColor(client.ecolor)
            return message.channel.send(embed)
        } else {
            let embed1 = new Discord.MessageEmbed()
                .setTitle('Nuke Confirmation!')
                .setDescription(`Are you sure you want to nuke **${message.channel.name}**?\n\n:warning: **THIS ACTION IS IRREVERSIBLE**\n\n*Say \`yes\` or \`no\`*`)
                .setColor("RED")
                .setFooter(`Requested by: ${message.author.tag}`)
                .setTimestamp()
            let filter = m => m.author.id === message.author.id
            message.channel.send(embed1).then(msg => {
                message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 5000,
                        errors: ['time']
                    })
                    .then(message1 => {
                        message1 = message1.first()
                        if (message1.content.toLowerCase() == 'yes' || message1.content.toLowerCase() == 'y') {
                            if (!client.devs.includes(message.author.id)) message.author.nukeCooldown = Date.now();

                            let category = message.channel.parentID
                            let channel = message.channel
                            let hoist = message.channel.position
                            channel.delete()
                            channel.clone()
                                .then(clone => {
                                    clone.setParent(category)
                                    clone.setPosition(hoist)

                                    let embed = new Discord.MessageEmbed()
                                        .setTitle('Nuked')
                                        .setDescription('This channel was nuked.')
                                        .setFooter(`Responsible User: ${message.author.tag}`)
                                        .setTimestamp()
                                        .setColor(client.ecolor)
                                        .setThumbnail('https://cherrybot.xyz/nuke.gif')
                                    clone.send(embed)
                                })

                        } else if (message1.content.toLowerCase() == 'no' || message1.content.toLowerCase() == 'n') {
                            if (!client.devs.includes(message.author.id)) message.author.nukeCooldown = Date.now();
                            message.delete()
                            msg.delete()
                            message1.delete()
                            message.channel.send('Canceled channel purge.').then(msg2 => {
                                msg2.delete({
                                    timeout: 3000
                                })
                            })
                        } else {
                            if (!client.devs.includes(message.author.id)) message.author.nukeCooldown = Date.now();
                            message.delete()
                            msg.delete()
                            message1.delete()
                            message.channel.send('Invalid response.').then(msg2 => {
                                msg2.delete({
                                    timeout: 3000
                                })
                            })
                        }
                    })
                    .catch(collected => {
                        message.delete()
                        msg.delete()
                        message.channel.send('You didnt respond.').then(msg1 => {
                            msg1.delete({
                                timeout: 3000
                            })
                        })
                    });
            })
        }

    }
}