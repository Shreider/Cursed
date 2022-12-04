//INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=960896544461185025&permissions=8&scope=applications.commands%20bot
//BOT REQUIRES
const { Client, Collection } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const Database = require('./events/DataBase_connection');
const { Player } = require('discord-player');
const { DiscordTogether } = require('discord-together');

//database things
const db = new Database();
db.connect();

const client = new Client({intents: 131071});
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});
client.discordTogether = new DiscordTogether(client);

module.exports = client;

//commands
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
};
//events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of eventFiles) {
    const event = require(`./events/${file}`);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    };
};
//buttons
const btnFiles = fs.readdirSync('./commands/btnInteractions').filter(file => file.endsWith('.js'));
for(const file of btnFiles) {
    const btn = require(`./commands/btnInteractions/${file}`);
    if(btn.once) {
        client.once(btn.name, (...args) => btn.execute(...args, commands));
    }
    else {
        client.on(btn.name, (...args) => btn.execute(...args, commands));
    };
};

client.login(process.env.TOKEN);
