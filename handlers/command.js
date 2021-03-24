const { readdirSync } = require("fs");
const color = require("colors")
const ascii = require("ascii-table");

let amount = 0;
let table = new ascii("Commands");
table.setHeading("Category", "Command", "Load status");
module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            amount = amount + 1
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(`${dir}`, file, 'Loaded!');
            } else {
                table.addRow(`${dir}`, file, `Failed!`)
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    
    //console.log(table.toString());
    console.log('[Commands] '.green.bold + `${amount}`.gray.underline + ` commands found!`.green.bold)
}