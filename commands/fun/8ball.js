const Discord = require("discord.js")

module.exports = {
    name: "8ball",
    description: "Ask it a question and it will give you an answer.",
    category: 'fun',
    usage: ["8ball (question)"],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        const question = args.join(' ');
        if (!question) return client.errorembed('You didnt ask the 8 ball a question.', message)

        const answers = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];
        let randomIndex = Math.floor(Math.random() * answers.length);
        let answer = answers[randomIndex]

        const embed = new Discord.MessageEmbed()
            .setTitle('🎱 8-Ball')
            .addField('Question', question)
            .setThumbnail("https://i.imgur.com/bKCC420.png")
            .addField('Answer', `${answer}`)
            .setColor(client.ecolor);
        message.channel.send(embed).catch(err => client.errorlog(err, message));
    }
} 