const GuildSettings = require('../models/DataBase_GuildSettings');

module.exports = {
    name: 'guildUpdate',
    on: true,

    async execute(oldGuild, newGuild) {
        GuildSettings.findOne({ guild_id: oldGuild.id }, (err, settings) => {
            if(err) {
                console.error(`Error: ${err}`);
                return;
            }

            if(!settings) {
                settings = new GuildSettings({
                    guild_id: oldGuild.id,
                    guild_name: newGuild.name,
                });
            }
            else {
                settings.guild_name = newGuild.name;
            }

            settings.save(err => {
                if(err) {
                    console.error(`Error: ${err}`);
                    return;
                }
            })
        })  
    }
}