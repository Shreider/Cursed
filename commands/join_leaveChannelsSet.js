const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const GuildSettings = require('../models/DataBase_GuildSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Set a new join or leave notify channel.')
        .addSubcommand(subcommand => subcommand
            .setName('join')
            .setDescription('Set a new join notify channel')
            .addChannelOption(option => option
                .setName('channel')
                .setDescription('Select a channel.')
                .setRequired(true)
                .addChannelTypes(channelTypes = 0)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('leave')
            .setDescription('Set a new leave notify channel')
            .addChannelOption(option => option
                .setName('channel')
                .setDescription('Select a channel.')
                .setRequired(true)
                .addChannelTypes(channelTypes = 0)
            )
        ),

    async execute(client, interaction) {
        const embed = new MessageEmbed();

        GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
            if(err) {
                console.error(`Error: ${err}`);
                return;
            }

            if(!interaction.member.roles.cache.get(`${settings.moderator_role_id}`)) {
                embed.setTitle(`You don't have moderator role!`);
                embed.setColor('RED');
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
                return;
            }

            var chType;
            if(interaction.options.getSubcommand() === 'join') {
                if(!settings) {
                    settings = new GuildSettings({
                        guild_id: interaction.guild.id,
                        guild_name: interaction.guild.name,
                        welcome_channel_id: interaction.options.getChannel('channel').id,
                    });
                }
                else {
                    settings.welcome_channel_id = interaction.options.getChannel('channel').id;
                };
                chType = 'Join Channel';
            }
            else if(interaction.options.getSubcommand() === 'leave') {
                if(!settings) {
                    settings = new GuildSettings({
                        guild_id: interaction.guild.id,
                        guild_name: interaction.guild.name,
                        byebye_channel_id: interaction.options.getChannel('channel').id,
                    });
                }
                else {
                    settings.byebye_channel_id = interaction.options.getChannel('channel').id;
                };
                chType = 'Leave Channel';
            }

            settings.save(err => {
                if(err) {
                    console.error(`Error: ${err}`);
                    embed.setTitle(`An error occurred: ${err}`);
                    embed.setColor('RED');
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                    return;
                }
                
                embed.setTitle(`A new channel has been set!`);
                embed.setFields(
                    {name: 'Channel', value: `${interaction.options.getChannel('channel')}`},
                    {name: 'Type', value: `${chType}`}
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