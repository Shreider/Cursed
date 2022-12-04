const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yt_together')
        .setDescription("YouTube Together."),

    async execute(client, interaction) {
        const e = new MessageEmbed();
        const btn = new MessageActionRow();

        client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
            e.setTitle('YouTube Together');
            btn.addComponents(
                new MessageButton()
                    .setLabel('Join!')
                    .setStyle('LINK')
                    .setURL(invite.code)
            );
            await interaction.reply({
                embeds: [e],
                components: [btn],
                ephemeral: false
            });
        });
    }
}