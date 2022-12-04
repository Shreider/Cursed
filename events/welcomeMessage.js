const GuildSettings = require('./../models/DataBase_GuildSettings')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'guildMemberAdd',
    on: true,

    async execute(member) {
        if(member.user.bot) return;
        GuildSettings.findOne({ guild_id: member.guild.id }, (err, settings) => {
            if(err) {
                console.error(`Error: ${err}`);
                return;
            }

            if(!GuildSettings.findOne({ guild_id: member.guild.id }) || !settings.welcome_channel_id) return;

            if(!member.guild.channels.cache.get(settings.welcome_channel_id)) {
                settings.welcome_channel_id = null;

                settings.save(err => {
                    if(err) {
                        console.error(`Error: ${err}`);
                        return;
                    }
                })
                return;
            }

            const embed = new MessageEmbed()
                .setTitle(`${member.user.username} joined to server!`)
                .setFields(
                    {name: 'Member', value: `${member}`}
                )
                .setColor('GREEN')
                if(member.user.avatarURL()) embed.setThumbnail(member.user.avatarURL())

            member.guild.channels.cache.get(settings.welcome_channel_id).send({embeds: [embed]})
        })
    }
}