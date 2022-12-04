const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription(`Display member profile tab!`)
        .addUserOption(option => 
            option.setName('member')
            .setDescription('Select member')),

    async execute(client, interaction) {
        const embed = new MessageEmbed();
        const optionUser = interaction.options.getUser('member');

        embed.setColor('RANDOM');
        if(optionUser) {
            embed.setTitle(`${optionUser.username}'s profile tab!`)
            .addFields(
                {name: 'Member', value: `${optionUser}`, inline: true},
                {name: 'App bot?', value: `${optionUser.bot ? 'Yes' : 'No'}`, inline: true},
                {name: 'JoinedAt (UTC)', value: `${moment.utc(optionUser.joinedAt).format('MMMM Do YYYY, hh:mm a')}`},
            );
            if(optionUser.avatarURL()) { embed.setThumbnail(optionUser.avatarURL()); };
        }
        else {
            embed.setTitle(`${interaction.member.user.username}'s profile tab!`)
            .addFields(
                {name: 'Member', value: `${interaction.member.user}`, inline: true},
                {name: 'App bot?', value: `${interaction.member.user.bot ? 'YES' : 'NO'}`, inline: true},
                {name: 'JoinedAt (UTC)', value: `${moment.utc(interaction.member.joinedAt).format('MMMM Do YYYY, hh:mm a')}`},
            );
            if(interaction.member.user.avatarURL()) { embed.setThumbnail(interaction.member.user.avatarURL()); };
        }

        interaction.reply({
            embeds: [embed],
            ephemeral: false
        });
    }
}
