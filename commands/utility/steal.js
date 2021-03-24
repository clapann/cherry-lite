const { Util } = require('discord.js');

module.exports = {
    name: "steal",
    description: "Steals a emoji from a guild.",
    category: 'utility',
    usage: ['steal :emoji:'],
    botperms: ['embed_links', 'send_messages', 'manage_emojis'],
    userperms: '\`MANAGE_EMOJIS\`',
    run: async (client, message, args) => {
        const memberp = message.guild.member(message.author);
        if (!memberp.permissions.has("MANAGE_EMOJIS")) {
            return client.errorembed('Insufficient permissions.', message)
        } 
        
        let emoji = args[0];
        if (!emoji) {
            client.errorembed('Please provide an emoji.', message)
        }

        let customemoji = Util.parseEmoji(emoji)

        if (customemoji.id) {
            const link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;
            const name = args.slice(1).join(" ");
            
            message.guild.emojis.create(`${link}`, `${name || `${customemoji.name}`}`).catch(async err => { 
                return client.errorembed(`An error occured: \`${err.message}\``, message);
            })

            client.sucessembed(`Emoji stolen with the name \`${name || `${customemoji.name}`}\``, message)
        } else {
            let CheckEmoji = Util.parseEmoji(emoji, {
                assetType: "png"
            });
            if (!CheckEmoji.id) {
                return client.errorembed('Invalid emoji. *(FYI: You cannot steal default discord emojis.)*', message)
            }
        }
    }
}
