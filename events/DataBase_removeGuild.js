const GuildSettings = require('../models/DataBase_GuildSettings');

module.exports = {
    name: 'guildDelete',
    on: true,

    async execute(guild) {
        GuildSettings.findOneAndDelete({ guild_id: guild.id }, (err) => {
            if(err) {
                console.error(`Error: ${err}`);
                return;
            }
        })

    }
}