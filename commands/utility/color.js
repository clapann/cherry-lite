const Canvas = require('canvas')
const Discord = require('discord.js')
const axios = require('axios')
    
module.exports = {
    name: 'color',
    description: 'Gets a color from a hex value.',
    category: 'utility',
    usage: ['color', 'color (Hex Value)'],
    botperms: ['embed_links', 'send_messages'],
    userperms: 'None',
    run: async (client, message, args) => {



let color;
    if (message.mentions.members.first()) {
        color = message.mentions.members.first().displayHexColor
    } else if (args[0]) {
       if(/(#|0x)([0-9A-F]{6})/i.test(args[0])) {
           color = args[0].match(/(#|0x)([0-9A-F]{6})/i)[2]
       } else{
        client.errorembed('Make sure the color is a hex value! | Example: #FF0000 | 0xFF0000', message)
           return
       }
    } else {
        color = message.member.displayHexColor 
    }
    try {
        message.channel.startTyping()
    const aa = color.replace('#','','0x','')
    const colour = await axios.get(`https://www.thecolorapi.com/scheme?hex=${aa}`)
    const canvas = Canvas.createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, 200, 200);
    ctx.fillStyle = `${colour.data.seed.hex.value}`;
    ctx.fill();
    const rightpic = new Discord.MessageAttachment(canvas.toBuffer(), 'wea.jpg')
    const canvasx = Canvas.createCanvas(500, 100);
    const ctxt = canvasx.getContext('2d');
    let y = canvasx.height / 2;
    ctxt.font = "12px Roboto";
    ctxt.textAlign = 'center';
    let addup = 0;
           for (let i=0; i<5; i++) {
        ctxt.beginPath();
        ctxt.rect(addup,0,100,100);
        ctxt.fillStyle = `${colour.data.colors[i].hex.value}`;
        ctxt.fill();
        addup = addup + 100;
        ctxt.beginPath();
        ctxt.rect(addup-80,y-15,60,30);
        ctxt.fillStyle = `black`;
        ctxt.fill();
        ctxt.fillStyle = `white`;
        ctxt.fillText(`${colour.data.colors[i].hex.value}`, addup-51, y+4.3);
    }
    const attachment = new Discord.MessageAttachment(canvasx.toBuffer(), 'color.jpg');
    const embed = new Discord.MessageEmbed()
    .setColor(`0x${colour.data.seed.hex.value}`)
    .setDescription(`\`HEX: ${colour.data.seed.hex.value} RGB: ${colour.data.seed.rgb.value}\``)
    .setTitle('Color')
    .setURL(`https://www.colorhexa.com/${colour.data.seed.hex.clean}`)
    .attachFiles(attachment)
    .setImage('attachment://color.jpg')
    .attachFiles(rightpic)
    .setThumbnail('attachment://wea.jpg')
    message.channel.send(embed)
} catch {
    client.errorembed('An API error occured. Please try again later, or join our support server.', message)
} finally {
    message.channel.stopTyping()
}
    }
}
