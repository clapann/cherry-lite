const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows a list of commands.',
    category: 'misc',
    usage: ['help'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let categories = client.categories
        let commands = client.commands

        const prefix = await client.getprefix(message.guild)

        if (!args[0]) {
            let helpEmbed = new Discord.MessageEmbed()
                .setColor(client.ecolor)
                .setTimestamp();

            categories.forEach((cmd) => {
                helpEmbed.addField(`${capfirst((cmd))}`, `\`${prefix}help ${cmd}\`\nTo view all ${cmd} commands`, true);
            });
            let amount = 0
            commands.forEach(() => {
                amount = amount + 1
            })

            helpEmbed.setTitle(`${client.user.username} help`);
            helpEmbed.setFooter(`${amount} total commands`)
            return message.channel.send(helpEmbed).catch(err => client.errorlog(err, message));
        } else if (args[1]) {
            args[0] = args[0].toLowerCase()
            args[1] = args[1].toLowerCase()

            if (!categories.includes(args[0])) {
                return nocat(message, args, prefix);
            }
            let command = client.commands.get(args[1]) || client.commands.get(client.aliases.get(args[1]));

            let embed = new Discord.MessageEmbed()
                .setColor(client.ecolor)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true
                }))

            if (command) {
                if (command.category === args[0]) {
                    let array = command.usage.join('\n')
                    embed.setTitle(`${capfirst(command.name)}`)
                    embed.setDescription(`${command.description}\n\nUsage: **\n${array}**\n\nCategory: **\n${capfirst(command.category)}**\n\nAliases: **\n${command.aliases ? `${command.aliases}` : "None"}**\n\nBot Permissions Needed: \n${command.botperms.join(', ').toUpperCase()}\n\nUser Permissions Needed: \n${command.userperms}`)
                } else {
                    return nocom(message, args, prefix);
                }
                return message.channel.send(embed)
            } else {
                return nocom(message, args, prefix);
            }

        } else if (args[0]) {
            args[0] = args[0].toLowerCase()

            if (!categories.includes(args[0])) {
                nocat(message, args, prefix)
            }

            categories.forEach((cat) => {
                if (cat === args[0]) {
                    let embed = new Discord.MessageEmbed()
                        .setColor(client.ecolor)
                        .setFooter(`Use ${prefix}help ${args[0]} (command) to view more info on the command`)

                    const commands = client.commands
                    let amount = 0

                    commands.forEach((cmd) => {
                        if (cmd.category === args[0]) {
                            amount = amount + 1
                            embed.addField(
                                `**${prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
                                `${cmd.description}`,
                                true
                            );
                        }
                    })
                    embed.setTitle(`${capfirst((cat))} commands (${amount})`)
                    message.channel.send(embed)
                }
            })
        }

    }
}

function nocat(message, args, prefix) {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(`${message.author.username}, i couldn't find the **${args[0]}** category, please run **${prefix}help** to view all the categories.`)
        .setColor("RED")
        .setTimestamp()
    message.channel.send(embed)
}

function nocom(message, args, prefix) {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(`${message.author.username}, i couldn't find the **${args[1]}** command in the **${args[0]}** category, please run **${prefix}help** to view all the commands.`)
        .setColor("RED")
        .setTimestamp()
    message.channel.send(embed)
}

function capfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}