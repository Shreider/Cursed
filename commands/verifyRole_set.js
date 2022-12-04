const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const GuildSettings = require('../models/DataBase_GuildSettings');
require('./btnInteractions/verifyRole_interactionCreate');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set_verify_role')
    .setDescription('Set a new "verify" role.')
        .addRoleOption(option => option
            .setName('role')
            .setDescription('Select a role.') 
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('description')
            .setDescription('Set a Description.') 
            .setRequired(false)
        ),

    async execute(client, interaction) {
        const embed = new MessageEmbed();

        GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
            if(err) {
                console.error(`An error has occurred: ${err}`);
                return;
            };

            if(!interaction.member.roles.cache.get(`${settings.moderator_role_id}`)) {
                embed.setTitle(`You don't have moderator role!`);
                embed.setColor('RED');
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
                return;
            }

            if(!settings) {
                settings = new GuildSettings({
                    guild_id: interaction.guild.id,
                    guild_name: interaction.guild.name,
                    verify_role_id: interaction.options.getRole('role').id,
                });
            }
            else {
                settings.verify_role_id = interaction.options.getRole('role').id
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
                
                embed.setTitle(`A new verify role has been set!`);
                embed.setFields(
                    {name: 'Role', value: `${interaction.options.getRole('role')}`}
                );
                embed.setColor('GREEN');
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });

                const btn = new MessageActionRow().addComponents(
				    new MessageButton()
					    .setCustomId('verify_role_add')
					    .setLabel('Verify me!')
					    .setStyle('SUCCESS')
			    );

                embed.setTitle(`Veryfy yourself!`);
                embed.setDescription(interaction.options.getString('description') ? interaction.options.getString('description') : '');
                embed.setColor('RANDOM');
                interaction.channel.send({
                    embeds: [embed],
                    components: [btn],
                    ephemeral: false
                });
            })
        })  
    }
}