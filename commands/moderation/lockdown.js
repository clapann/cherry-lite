const Discord = require('discord.js');
module.exports = {
    name: "lockdown",
    description: "Locks the channel for a specific time.",
    category: 'moderation',
    usage: ['lockdown (time) | lockdown release'],
    botperms: ['embed_links', 'send_messages', 'manage_channels'],
    userperms: '\`manage_channels\`',
    run: async (client, message, args) => {
        const ms = require('ms');
            let guild = message.guild;

        
            if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.reply('You cannot use this command.').catch(console.error)
            if (!client.lockit) client.lockit = [];
            let time = args.join(' ');
            let validUnlocks = ['release', 'unlock'];
            if (!time) return client.errorembed('You must set a duration for the lockdown in either hours, minutes or seconds', message)
            
            if (validUnlocks.includes(time)) {
                message.channel.createOverwrite(message.guild.id, {
                    SEND_MESSAGES: null
                }).then(() => {
                    client.sucessembed('Lockdown Lifted!', message)
                    
                    clearTimeout(client.lockit[message.channel.id]);
                    delete client.lockit[message.channel.id];
                }).catch(error => {
                    console.log(error);
                });
            } else {
                message.channel.createOverwrite(message.guild.id, {
                    SEND_MESSAGES: false
                    }).then(() => {
                            client.sucessembed(`Channel locked down for ${ms(ms(time), { long: true })}!`, message)
                            client.lockit[message.channel.id] = setTimeout(() => {
                                message.channel.createOverwrite(message.guild.id, {
                                    SEND_MESSAGES: null
                                }).then(client.sucessembed('Lockdown Lifted!', message)).catch(console.error);
                                delete client.lockit[message.channel.id];
                            }, ms(time));
                    })
                };
            }
        
}
