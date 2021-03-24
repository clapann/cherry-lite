const Discord = require('discord.js');
let config = require('../config.json')
const colors = require('colors');

module.exports.run = async(client) => {
    console.log(`[Ready] Hi, `.green.bold + `${client.user.username}`.gray.underline + ` is now online!`.green.bold)

        //Status
        let amount = 0
        setInterval(() => {
            let status = [
                `Ping me for help!`,
                `${parseInt(client.users.cache.size).toLocaleString()} users.`,
                `${parseInt(client.guilds.cache.size).toLocaleString()} guilds.`,
            ]

            if(amount === 3) amount = 0

            if(amount === 0) {
                client.user.setActivity(status[amount], {type: "PLAYING"})
            } else if(amount === 1) {
                client.user.setActivity(status[amount], {type: "LISTENING"})
            } else if(amount === 2) {
                client.user.setActivity(status[amount], {type: "LISTENING"})
            } 
            amount = amount + 1
        }, 5000);
}
