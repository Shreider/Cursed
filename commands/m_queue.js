const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription(`Aktualnie wszystkie zwracane wartości są w formie "Byle by były aby zobaczyć czy działa."`)
        .addNumberOption(option => option
            .setName('page')
            .setDescription('Select a page to display.')
            .setRequired(false)
            .setMinValue(1)
        ),

    async execute(client, interaction) {
        const embed = new MessageEmbed();

        const queue = await client.player.getQueue(interaction.guild);
        if(!queue || !queue.playing) {
            embed
                .setTitle(`🎶 Current Queue | 0 entries.`)
                .setFooter(`Page 1 of 1 || LoopMode: OFF`)
            await interaction.reply({
                embeds: [embed],
                ephemeral: true 
                });
            return;
        }

        const totalPages = Math.ceil(queue.tracks.length / 20) || 1;
        const page = (interaction.options.getNumber('page') || 1) - 1;

        if(page > totalPages - 1) {
            if((totalPages - 1) < 2) {
                embed
                    .setTitle(`Invalid page number. At this moment queue has ${totalPages} page.`)
            }
            else {
                embed
                    .setTitle(`Invalid page number. At this moment queue has ${totalPages} pages.`)
            }
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
            return;
        }

        const queueString = queue.tracks.slice(page * 20, page * 20 + 20).map((song, i) => {
            return `**[${page * 20 + i + 1}]** \` [${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join('\n');

        var lp = await queue.repeatMode;
        if(lp === 2) {
            lp = 'Queue';
        }
        else if(lp === 1) {
            lp = 'Current';
        }
        else {
            lp = 'OFF';
        }

        embed
        .setTitle(`🎶 Current Queue | ${queue.tracks.length} entries.`)
        .setDescription(`${queueString}`)
        .setFooter(`Page ${page + 1} of ${totalPages} || LoopMode: ${lp}`)

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}