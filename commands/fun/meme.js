const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "meme",
    description: "Gets a random meme from reddit.",
    category: 'fun',
    usage: ["meme"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
      let res = await fetch('https://meme-api.herokuapp.com/gimme');
      res = await res.json();
      const embed = new Discord.MessageEmbed()
        .setImage(res.url)
        .setDescription(res.title)
        .setColor(client.ecolor)
        .setFooter(`r/${res.subreddit}`)
        .setTimestamp();
      message.channel.send(embed).catch(err => client.errorlog(err, message));
    }
}