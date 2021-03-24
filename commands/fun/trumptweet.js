const fetch = require('node-fetch');

module.exports = {
    name: "trumptweet",
    aliases: ["tweet"],
    description: "Make Donald J. Trump tweet something.",
    category: 'fun',
    usage: ["trumptweet (text)"],
    botperms: ['send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("What do you want me to make trump tweet lol.")
        let tweet = args.join(' ')
        var replaced = require('querystring').escape(tweet);
        const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + replaced);
        const img = (await res.json()).message;

        if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';
        message.channel.send("", {
            files: [img]
        });
    }
}