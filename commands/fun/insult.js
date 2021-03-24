const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "insult",
    description: "Get a insult at you or a user.",
    category: 'fun',
    usage: ["insult", "insult @user"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || message.author;

        const res = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
        let joke = (await res.json()).insult;
        client.insults.push(joke)

        if (client.insults.includes(joke)) {
            const res = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
            joke = (await res.json()).insult;
        }

        let embed = new Discord.MessageEmbed()
            .setTitle("Insult")
            .setDescription(`${user}, ${joke}`)
            .setColor(client.ecolor)
        message.channel.send(embed)
    }
}