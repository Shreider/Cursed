const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const GuildSettings = require('../models/DataBase_GuildSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set_moderator_role')
    .setDescription('Set a new "moderator" role.')
        .addRoleOption(option => option
            .setName('role')
            .setDescription('Select a role.') 
            .setRequired(true)
        ),

    async execute(client, interaction) {
        const embed = new MessageEmbed();

        if(!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
            embed.setTitle(`You don't have administrator permissions!`);
            embed.setColor('RED');
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        };

        GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
            if(err) {
                console.error(`An error has occurred: ${err}`);
                return;
            };

            if(!settings) {
                settings = new GuildSettings({
                    guild_id: interaction.guild.id,
                    guild_name: interaction.guild.name,
                    moderator_role_id: interaction.options.getRole('role').id,
                });
            }
            else {
                settings.moderator_role_id = interaction.options.getRole('role').id
            };

            settings.save(err => {
                if(err) {
                    console.error(`Error: ${err}`);
                    embed.setTitle(`An error has occurred: ${err}`);
                    embed.setColor('RED');
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                    return;
                }
                
                embed.setTitle(`A new moderator role has been set!`);
                embed.setFields(
                    {name: 'Role', value: `${interaction.options.getRole('role')}`}
                );
                embed.setColor('GREEN');
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            })
        })  
    }
}