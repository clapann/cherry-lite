module.exports = {
    name: "triggered",
    description: "Puts triggered over a users avatar.",
    category: 'fun',
    usage: ["triggered", "triggered @user"],
    botperms: ['embed_links', 'attach_files'],
    userperms: 'None',
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || message.author;
        let url = user.displayAvatarURL()

        if (url.includes(".webp") || url.includes(".gif")) {
            url = url.split('.webp').join(".png")
        }

        message.channel.send("", {
            files: [`https://some-random-api.ml/canvas/triggered?avatar=${url}`]
        })
    }
}