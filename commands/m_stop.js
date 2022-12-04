const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription(`Aktualnie wszystkie zwracane wartości są w formie "Byle by były aby zobaczyć czy działa."`),

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

        await queue.destroy();

        embed
        .setTitle(`The player has stopped and the queue has been cleared!`)
        await interaction.reply({
            embeds: [embed],
            ephemeral: false
        });
    }
}