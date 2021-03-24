const Discord = require("discord.js")
module.exports = {
    name: "hack",
    description: "Hacks a user",
    category: 'fun',
    usage: ["hack @user"],
    botperms: ['send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {
        let user = message.mentions.users.first()
        if (!user) return client.errorembed('You didnt mention a user to hack.', message)

        let emoji = '<a:loading:812182106222493736>'
        let email = [
            'gmail.com',
            'yahoo.com',
            'fortnite.com',
            'protonmail.com'
        ]
        let random = Math.floor(Math.random() * email.length);
        let pass = [
            'hasSmallPeen',
            'bigpp',
            '13451'
        ]
        let random2 = Math.floor(Math.random() * pass.length);
        let ip = [
            '1.1.1.1',
            '192.168.1.1'
        ]
        let random3 = Math.floor(Math.random() * ip.length);

        let femail;
        let fpassword;
        let fip;
        message.channel.send(`${emoji} Attempting to hack ${user.username}`).then(msg => {
            setTimeout(() => {
                msg.edit(`${emoji} Hacking into ${user.username}'s email`)
                setTimeout(() => {
                    femail = `${user.username}.${user.discriminator}@${email[random]}`
                    msg.edit(`${emoji} Successfully hacked ${user.username}'s email: \`${femail}\``)
                    setTimeout(() => {
                        msg.edit(`${emoji} Hacking ${user.username}'s password`)
                        setTimeout(() => {
                            fpassword = `${user.username}${pass[random2]}!${user.discriminator}`
                            msg.edit(`${emoji} Successfully hacked ${user.username}'s password: \`${fpassword}\``)
                            setTimeout(() => {
                                msg.edit(`${emoji} Finding IP Address.`)
                                setTimeout(() => {
                                    fip = `${ip[random3]}`
                                    msg.edit(`${emoji} Found IP adress: \`${fip}\``)
                                    setTimeout(() => {
                                        msg.edit(`<:check:812182105894158366> This *totally* real and dangerous hack is now complete\n||:warning: THIS IS FAKE AND DOES NOT SHOW REAL INFO THIS COMMAND WAS JUSTMADE FOR FUN AND JOKES.||\n\nInfo gathered:\nEmail: \`${femail}\`\nPassword: \`${fpassword}\`\nIP: \`${fip}\``)
                                    }, 11000);
                                }, 9000);
                            }, 8000);
                        }, 6000);
                    }, 5000);
                }, 3000);
            }, 2000);
        })
    }
}