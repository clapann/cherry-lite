const Discord = require("discord.js")
const config = require('../../config.json')
module.exports = {
    name: "whois",
    aliases: ['userinfo'],
   	description: "Shows info on you or a user.",
    category: 'utility',
    usage: ['whois', 'whois @user'],
    botperms: ['embed_links', 'send_messages', 'manage_roles'],
    userperms: 'None',
    run: async (client, message, args, ) => {
        let user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user);
        let isbot = "false"
        if (user.bot) isbot = "true"
        let arr = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        let roles = arr.length < 3 ? arr.join(', ') : arr.length > 10 ? trimArray(arr).join(', ') : 'None';

        let activites = member.presence.activities[0]

        if (!activites) {
            activites = "None"
        }

        if (activites.type === "CUSTOM_STATUS") {
            activites = member.presence.activities[1]
        }

        const embed = new Discord.MessageEmbed()
            .setColor(client.ecolor)
            .setThumbnail(user.avatarURL)
            .setTitle(`${user.username}#${user.discriminator}`, true)
            .addField('ID:', `${user.id}`, true)
            .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField('Game:', `${activites ? activites : 'None'}`, true)
            .addField('Account Created:', user.createdAt.toDateString(), true)
            .addField('Joined', member.joinedAt.toDateString(), true)
            .addField('Roles:', roles, true)
            .addField('Bot:', isbot, true)
            .setThumbnail(user.displayAvatarURL({
                dynamic: true
            }));
        if (config.owners.includes(user.id)) embed.addField(`${client.user.username} team`, `This user is a owner of ${client.user.username}!`, true)
        message.channel.send(embed)
    }
}

function trimArray(arr, maxLen = 3) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`and ${len} more.`);
    }
    return arr;
}