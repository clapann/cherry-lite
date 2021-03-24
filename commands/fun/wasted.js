module.exports = {
    name: "wasted",
    description: "Puts the wasted screen over a users avatar.",
    category: 'fun',
    usage: ["wasted", "wasted @user"],
    botperms: ['send_messages', 'attach_files'],
    userperms: 'None',
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || message.author;
        let url = user.displayAvatarURL()

        if (url.includes(".webp") || url.includes(".gif")) {
            url = url.split('.webp').join(".png")
        }

        message.channel.send("", {
            files: [`https://some-random-api.ml/canvas/wasted?avatar=${url}`]
        })
    }
}