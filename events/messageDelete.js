module.exports.run = async (client, message) => {

    let time = Date.now()
    message.channel.snipeMessage = message
    message.channel.snipeTime = time
    message.channel.snipeUser = message.author.id

    setTimeout(() => {
        if(message.author.bot) return;
        if(message.content) return;
        if (message.channel.snipeTime === time) {
            message.channel.snipeMessage = undefined
            message.channel.snipeTime = undefined
            message.channel.snipeUser = undefined
        }
    }, 180000);
}