const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'info',
    description: 'Get info on the bot.',
    category: 'info',
    usage: ['info'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        //Get Devs
        let arr = []
        config.owners.forEach(user => {
            user = client.users.cache.get(user);
            arr.push(user.tag)
        })
        if(!arr.length) arr.push('No developers found in the config file.')
        let guilds = client.guilds.cache.size.toString()
        let users = client.users.cache.size.toString()
        let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username)
            .setColor(client.ecolor)
            .addField(`Version`, client.version, true)
            .addField(`Library`, `[discord.js](https://discord.js.org/#/ "The discord API for node.js.")`, true)
            .addField(`Developers`, arr.join('\n'), true)
            .addField(`Guilds`, guilds, true)
            .addField(`Users`, users, true)
            .addField(`Commands used`, client.sessioncommands, true)
            .setFooter(`${client.user.username} ${client.version}`, client.user.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
