const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Check the bot and discord\'s API ping.',
  category: 'info',
  usage: ['ping'],
  botperms: ['embed_links', 'send_messages'],
  userperms: 'None',
  run: async (client, message, args) => {

    message.channel.send("Pinging...").then(m => {
      let ping = (new Date().getTime() - message.createdTimestamp);

      var embed = new Discord.MessageEmbed()
        .setTitle(":ping_pong: Pong!")
        .setDescription(`**Ping**: ${ping}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms`)
        .setColor(client.ecolor)

      m.edit("", embed)
    });
  }
}