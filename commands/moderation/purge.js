module.exports = {
    name: "purge",
    aliases: ['clear'],
    description: "Purges messages in a channel",
    category: 'moderation',
    usage: ['purge 10', 'purge @user 100', 'purge bots', 'purge match (text)'],
    botperms: ['send_messages', 'manage_messages'],
    userperms: '\`ADMINISTRATOR\`',
    run: async (client, message, args) => {

        const member = message.guild.member(message.author);
        if (!member.permissions.has("ADMINISTRATOR")) {
            return client.errorembed('Insufficient permissions.', message)
        }

        const prefix = await client.getprefix(message.guild)
        message.delete().catch(err => client.errorlog(err, message));
        if (!args[0]) return message.channel.send(`What type of purging do you want to use?? Use \`${prefix}help moderation purge\` for all the purging types.`)

        if (args[0] === "bots") {
            message.channel.messages.fetch({
                limit: 100,
            }).then(messages => {
                messages = messages.filter(m => m.author.bot).array().slice(0, 100);
                message.channel.bulkDelete(messages)
                    .then(deleted => {
                        message.channel.send(`✏️ | Successfully deleted ${deleted.size} messages.`).then(msg => {
                            msg.delete({
                                timeout: 5000
                            }).catch(err => client.errorlog(err, message));
                        })
                    })
                    .catch(err => client.errorlog(err, message));
            })
        } else if (args[0] === "match") {
            let topurge = args.join(' ').replace('match', '').slice(1);
            if (topurge === '') return message.channel.send("So you try to purge messages with matching text yet you dont tell me the text? use \`purge match (text)\`.")
            message.channel.messages.fetch({
                limit: 100,
            }).then(messages => {
                messages = messages.filter(m => m.content === `${topurge}`).array().slice(0, 100);
                message.channel.bulkDelete(messages)
                    .then(deleted => {
                        message.channel.send(`✏️ | Successfully deleted ${deleted.size} messages.`).then(msg => {
                            msg.delete({
                                timeout: 5000
                            }).catch(err => client.errorlog(err, message));
                        })
                    })
                    .catch(err => client.errorlog(err, message));
            })
        } else if (!message.mentions.users.first()) {
            if (parseInt(args[0]) > 100) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[0]);
            }

            message.channel.messages.fetch({
                limit: 100,
            })
            message.channel.bulkDelete(deleteAmount, true)
                .then(deleted => {
                    message.channel.send(`✏️ | Successfully deleted ${deleted.size} messages.`).then(msg => {
                        msg.delete({
                            timeout: 5000
                        }).catch(err => client.errorlog(err, message));
                    })
                })
                .catch(err => client.errorlog(err, message));
        } else if (message.mentions.users.first()) {
            const user = message.mentions.users.first()

            if (parseInt(args[1]) > 100) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[1]);
            }

            message.channel.messages.fetch({
                limit: 100,
            }).then(messages => {
                const filterBy = user ? user.id : Client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, deleteAmount);

                message.channel.bulkDelete(messages)
                    .then(deleted => {
                        message.channel.send(`✏️ | Successfully deleted ${deleted.size} messages.`).then(msg => {
                            msg.delete({
                                timeout: 5000
                            }).catch(err => client.errorlog(err, message));
                        })
                    })
                    .catch(err => client.errorlog(err, message));
            })
        }
    }
}
