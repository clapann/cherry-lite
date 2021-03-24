const Discord = require('discord.js');
const sourcebin = require('sourcebin');
let config = require('../config.json')

module.exports.run = async (client, message) => {

    let prefix = config.prefix

    //Define args
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    //Check for help ping
    if (args[0].startsWith(`@!${client.user.id}>`)) {
        if (args[1]) return;
        helpEmbed(message, client, prefix)
    } else if (args[0].startsWith(`@${client.user.id}>`)) {
        if (args[1]) return;
        helpEmbed(message, client, prefix)
    }

    //Command stuff
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    const argsl = args.toString().toLowerCase()

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if(!command) return;

    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    let cooldownAmount;
    cooldownAmount = (command.cooldown || 5) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {

            let timeLeft;

            timeLeft = (expirationTime - now) / 1000;

            let embed = new Discord.MessageEmbed()
                .setTitle(":x: Error")
                .setDescription(`${message.author.username}, please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${command.name}\` command.`)
                .setColor(client.ecolor)

            return message.channel.send(embed)
        }
    }

    if(!config.owners.includes(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    //Try to run the command
    try {
        if (command) {

            let permsneeded = command.botperms
            let check = false
            permsneeded.forEach(perm => {
                perm = perm.toUpperCase()
                if (!message.guild.me.hasPermission(perm)) {
                    check = true
                    return client.errorembed(`It looks like the bot is missing the permission: \`${perm}\`. Please give **ch$rry** the \`${perm}\` permission to run this command.`, message)
                }
                if (check === true) return;
            })
	    client.sessioncommands = client.sessioncommands + 1
            command.run(client, message, args, argsl);
        }
    } catch (err) {
        console.error(err);
        message.reply("There was an error executing that command.")
        client.errorlog(err, message)
    }
}

function helpEmbed(message, client, prefix) {
    let body = `${message.guild.name}'s prefix is ${prefix}\n\n`;

    ['fun', 'info', 'misc', 'moderation', 'utility'].forEach(cat => {
        body += `[${capfirst(cat)}]\n`;
        client.commands.filter(cmd => cmd.category === cat).forEach(cmd => {
            let usage = cmd.usage.join(', ')
            body += `\n`;
            body += `   [+] ${prefix}${cmd.name}\n`;
            body += `     + Description: ${cmd.description}\n`;
            body += `     + Usage: ${usage}\n`
            body += `     `
            body += `\n`
        })
    })
    sourcebin.create([{
        name: 'ch$rry commands',
        content: body,
        languageId: 'text'
    }], {
        title: "ch$rry commands",
        description: `List of commands for ${message.guild.name}`
    }).then(response => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Guild: ${message.guild.name}`)
            .setDescription(`The prefix for **${message.guild.name}** is \`${prefix}\``)
            .setColor(client.ecolor)
            .addField("Help & Support", `[All commands](${response.url})\n[Status page](https://status.cherrybot.xyz)\n[Support server](https://discord.gg/DqQy26jzKR)`)
            .addField("Help & Support", `[Status page](https://status.cherrybot.xyz)\n[Support server](https://discord.gg/DqQy26jzKR)`)
            .addField("Get ch$rry", `[Invite](https://discord.com/oauth2/authorize?client_id=775604826448592927&scope=bot&permissions=8)`)
        return message.author.send(embed)
     })
}