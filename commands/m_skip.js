const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription(`Skip current song.`)
        .addNumberOption(option => option
            .setName('skipto')
            .setDescription('The song to skip to.')
            .setRequired(false)
            .setMinValue(1)
        ),

    async execute(client, interaction) {
        const embed = new MessageEmbed();

        const queue = await client.player.getQueue(interaction.guild);
        if(!queue) {
            embed
                .setTitle(`Queue is empty.`)
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
                });
            return;
        }

        if(!interaction.options.getNumber('skipto')) {
            queue.skip();
    
            embed
                .setTitle(`Skipped ahead to next song!`);
            await interaction.reply({
                embeds: [embed],
                ephemeral: false
            });
            return;
        }

        const trackNum = interaction.options.getNumber('skipto');
        
        if(trackNum > queue.tracks.length) {
            embed
                .setTitle(`Invalid song index!`);
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
            return;
        }

        queue.skipTo(trackNum - 1);
        embed
            .setTitle(`Skipped ahead to song number **${trackNum}**`);
        await interaction.reply({
            embeds: [embed],
            ephemeral: false
        });
    }
}