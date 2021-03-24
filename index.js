//Call Discord.js
const { Client, Collection, ShardingManager } = require("discord.js");
const Discord = require("discord.js")
const client = new Discord.Client({ disableMentions: 'everyone' });

//Other modules
const fs = require("fs");
const config = require('./config.json')

//Login
client.login(config.token)

//Global
client.ecolor = "#ff6a01"
client.sessioncommands = 0
client.insults = []
client.version = '1.0'
client.sleep = function(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

//Command handler
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


//Event handler
function loadEvents(){
    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.filter(file => {
            let eventFunction = require(`./events/${file}`);
            let eventName = file.split(".")[0];
                if(eventFunction.length <= 0) {
                  console.log("No Events to load!")
                    return
                }
                client.on(eventName, (...args) => eventFunction.run(client, ...args));
        });
        console.log('[Events] Loaded a total amount of '.green.bold + `${files.length}`.gray.underline + ' events!'.green.bold)
    });

    
    
}
loadEvents();

//Get prefix
client.getprefix = function() {
    return config.prefix
}

//Error log function
client.errorlog = function(err, message){
    console.log(err.message)
};

//Error embed function
client.errorembed = function(string, message) {
    let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ | ${string}`)
    message.channel.send(embed)
}

client.sucessembed = function(string, message) {
    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`✔ | ${string}`)
    message.channel.send(embed)
}