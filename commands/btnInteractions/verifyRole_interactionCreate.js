const GuildSettings = require('../../models/DataBase_GuildSettings');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    on: true,

    async execute(interaction) {
        if(interaction.isButton()) {
            if(interaction.customId === 'verify_role_add') {
                const embed = new MessageEmbed();
                GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
                    if(err) {
                        console.error(`An error has occurred: ${err}`);
                        return;
                    };
        
                    if(!settings) {
                        embed.setTitle(`DataBese error!`);
                        embed.setColor('RED');
                        interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                        return;
                    }
                    else {
                        if(!interaction.member.roles.cache.get(`${settings.verify_role_id}`)) {
                            interaction.guild.members.cache.get(`${interaction.user.id}`).roles.add(`${settings.verify_role_id}`);

                            embed.setTitle(`Now you are verified!`);
                            embed.setColor('GREEN');
                            interaction.reply({
                                embeds: [embed],
                                ephemeral: true
                            });
                        }
                        else {
                            embed.setTitle(`You are already verified!`);
                            embed.setColor('RED');
                            interaction.reply({
                                embeds: [embed],
                                ephemeral: true
                            });
                        }
                    }
                })
            }
        }
    }
}