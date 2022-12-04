const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('now_playing')
        .setDescription(`Displays the current song info."`),

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

        let bar = queue.createProgressBar({
            queue: false,
            length: 32,
            timecodes: true
        });
        const song = queue.current;

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
        .setTitle(`▶️ **${song.title}**`)
        .setDescription(`\`${bar}\``)
        .setURL(song.url)
        .setFooter(`LoopMode: ${lp}`)
        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}