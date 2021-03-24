const Discord = require('discord.js');

module.exports = {
    name: 'uptime',
    description: 'Shows how long the bot has been online for.',
    category: 'info',
    usage: ['uptime'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        let embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} uptime!`)
            .setColor(client.ecolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`**Uptime:** ${duration(client.uptime)}`)
        message.channel.send(embed)
    }
}

function duration(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    return `${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s).`
}