const Discord = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "mock",
    description: "Mock a text.",
    category: 'fun',
    usage: ["mock (text)"],
    botperms: ['attach_files', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let mock = args.join(' ')
        if(!mock.length) return client.errorembed('You didnt define text to mock.', message)
        if(mock.length < 3) return client.errorembed('The text has to be longer than 3 characters.', message)

        function flipCase(str) { 
            var flip = '';
            for (var i = 0; i < str.length; i++) {
              if(Math.random() > .5){
                flip += str.charAt(i).toUpperCase();
              } else {
                flip += str.charAt(i).toLowerCase();
              }
            }
            return flip;
        }
        
        message.channel.send(`${flipCase(args.join(' '))}`, {
            files: [`https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/05/spongebob.jpg?w=1000&h=600&crop=1`]
        })
    }
} 