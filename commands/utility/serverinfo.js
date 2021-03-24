const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    description: 'Shows info about the guild.',
    category: 'utility',
    usage: ['serverinfo'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let guild = message.guild

        const owner = client.users.cache.get(guild.ownerID)
        let channel = guild.channels.cache
        let channels;
        let categories;
        let voice;
        let roles;
        let code;
        let uses;
        let emojis;
        channels = channel.filter(c => c.type === 'text')
        categories = channel.filter(c => c.type === 'category')
        voice = channel.filter(c => c.type === 'voice')
        roles = guild.roles.cache.size
        emojis = guild.emojis.cache.size

        if (guild.vanityURLCode === null) {
            code = "None"
            uses = "0"
        } else {
            code = `discord.gg/${guild.vanityURLCode}`
            uses = guild.vanityURLUses
        }
        guild.verificationLevel = guild.verificationLevel.toLowerCase()
        let embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({
                dynamic: true
            }))
            .addField("Owner", `${owner.tag}`, true)
            .addField("Region", `${guild.region}`, true)
            .addField("Categories", categories.size, true)
            .addField("Text channels", channels.size, true)
            .addField("Voice channels", voice.size, true)
            .addField("Member count", guild.memberCount, true)
            .addField("Roles", roles, true)
            .addField("Server boost status", `Level ${guild.premiumTier} | ${guild.premiumSubscriptionCount} boost(s)`, true)
            .addField('Vanity', `${code} | ${uses} use(s)`, true)
            .addField('Server created', moment(guild.createdTimestamp).format("L"), true)
            .addField('Emojis', `${emojis} emoji(s)`, true)
            .addField('Verification level', `${capfirst(guild.verificationLevel)}`, true)
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .setColor(client.ecolor)
            .setFooter(`ID: ${guild.id}`)
        message.channel.send(embed)
    }
}

function capfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}