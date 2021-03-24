module.exports = {
    name: "unban",
    description: "Unbans a User.",
    category: 'moderation',
    usage: ['unban (user) (reason)'],
    botperms: ['send_messages',  'unban_members'],
    userperms: '\`unban_members\`',
    run: async (client, message, args) => {
        const membepr = message.guild.member(message.author);
        if (!memberp.permissions.has("ADMINISTRATOR")) {
            return client.errorembed('Insufficient permissions.', message)
        } else if (!memberp.permissions.has("UNBAN_MEMBERS")) {
            return client.errorembed('Insufficient permissions.', message)
        }
        let reason = args[1]
        var guild = message.guild
        let search = args[0];
        if (!search) return message.channel.send("Please provide a valid ID or name.");
        if (!reason) reason = 'No reason provided'
        try {
            let bans = await message.guild.fetchBans();
            const banned = await bans.find(b => b.user.id === search)

            if (!banned) return message.channel.send("I could not find a banned user by this ID or name.");

            await guild.members.unban(banned.user)

            message.channel.send(`${banned.user} has been unbanned. Reason: ${reason}`);
        } catch (e) {
            message.channel.send(`Unban failed: ${e.message}`)
        }
    }

}
