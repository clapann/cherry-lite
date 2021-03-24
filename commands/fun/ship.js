const Discord = require('discord.js')

module.exports = {
    name: "ship",
    description: "Sees if 2 people are compatible.",
    category: 'fun',
    usage: ["ship (user) (user)"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {

      const shipTarget1 = args[0]
      const shipTarget2 = args[1]
      
      if (!shipTarget1) return client.errorembed('You didnt define a user.', message)
      if (!shipTarget2) return client.errorembed('You didnt define a user.', message)

      if (shipTarget1 === shipTarget2) return client.errorembed('You cant ship your self.')

      const shipEmbed = new Discord.MessageEmbed()
        .setTitle('💗 | MatchMaking | 💗')
        .setDescription(`🔻 | ${shipTarget1} \n🔺 | ${shipTarget2}`)
        .setColor(client.ecolor)
        .addField('MatchMaking Result', (`Their love-score is ${Math.floor(Math.random() * 100)}%! 💘`))
      message.channel.send(shipEmbed)
    }
}