const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Make a poll.',
    category: 'utility',
    usage: ['poll (yes or no question)'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

        const memberp = message.guild.member(message.author);
        if (!memberp.permissions.has("MANAGE_MESSAGES")) {
            return client.errorembed('Insufficient permissions.', message)
        }

        let question = args.join(' ')
        if(!question) return client.errorembed('You didnt give a question.', message)

        let embed = new Discord.MessageEmbed()
        .setTitle('Poll!')
        .setDescription(question)
        .setColor(client.ecolor)
        .setFooter(`Poll by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(embed).then(async msg => {
            await msg.react('✅')
            await msg.react('❌')
        })
    }
}
