module.exports.run = async (client, oldMessage, newMessage) => {
    let time = Date.now()
    newMessage.channel.editMessage = oldMessage
    newMessage.channel.editTime = time
    newMessage.channel.editUser = oldMessage.author.id

    setTimeout(() => {
        if(oldMessage.author.bot) return;
        if(oldMessage.content) return;
        if (newMessage.channel.editTime === time) {
            newMessage.channel.editMessage = undefined
            newMessage.channel.editTime = undefined
            newMessage.channel.editUser = undefined
        }
    }, 180000);
}