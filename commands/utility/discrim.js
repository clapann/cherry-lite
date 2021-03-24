const Discord = require('discord.js');

module.exports = {
    name: 'discrim',
    description: 'Get users with the same discriminator as you.',
    category: 'utility',
    usage: ['discrim', 'discrim (discrimnator)'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let discrim;
        let users = []

        if (!args[0]) discrim = message.author.discriminator
        else {
            if (args[0].length > 4) {
                return message.reply("Thats an invalid discriminator.")
            } else if (isNaN(args[0])) {
                return message.reply("Thats an invalid discriminator.")
            } else if (args[0] === '0000') {
                return message.reply("Thats an invalid discriminator.")
            } else {
                discrim = args[0]
            }
        }
		let amount = 0
        client.users.cache.forEach(member => {
            if (member.discriminator === discrim) {
                users.push(`${member.tag}`)
				amount = amount + 1
            }
        });
        if (users.length === 0) users.push(`Found 0 uers with the discriminator \`${discrim}\``)

        let embed = new Discord.MessageEmbed()
        	.setTitle(`Discriminator: ${discrim}`)
            .setDescription(users.join('\n'))
            .setColor(client.ecolor)
			.setFooter(`Requested by ${message.author.tag} | ${amount} user(s)`)
        message.channel.send(embed)
    }
}