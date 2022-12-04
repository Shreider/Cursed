const GuildSettings = require('../models/DataBase_GuildSettings');

module.exports = {
    name: 'guildCreate',
    on: true,

    async execute(guild) {
        GuildSettings.findOne({ guild_id: guild.id }, (err, settings) => {
            if(err) {
                console.error(`Error: ${err}`);
                return;
            }

            if(!settings) {
                settings = new GuildSettings({
                    guild_id: guild.id,
                    guild_name: guild.name,

                    moderator_role_id: null,

                    welcome_channel_id: null,
                    byebye_channel_id: null,

                    verify_role_id: null,
                });
            }
            else {
                settings.guild_name = guild.name;
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