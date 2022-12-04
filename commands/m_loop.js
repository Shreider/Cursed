const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription(`placecholder`)
        .addStringOption(option => option
            .setName('mode')
            .setDescription('placecholder')
            .setRequired(true)
            .addChoices(
                { name: 'current', value: 'current' },
                { name: 'queue', value: 'queue' },
                { name: 'off', value: 'off' },
            )
        ),

    async execute(client, interaction) {
        const embed = new MessageEmbed();
        var ep;

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

        if(interaction.options.getString('mode') === 'current') {
            await queue.setRepeatMode(1);
            embed.setTitle(`Current song has been looped!`);
            ep = false;
        }
        else if(interaction.options.getString('mode') === 'queue') {
            if(queue.tracks.length>0) {
                await queue.setRepeatMode(2);
                embed.setTitle(`Queue has been looped!`);
                ep = false;
            }
            else {
                embed.setTitle('Queue is empty. Try ```/loop mode:current```');
                ep = true;
            }
        }
        else if(interaction.options.getString('mode') === 'off') {
            await queue.setRepeatMode(0);
            embed.setTitle(`Loop has been turned off.`);
            ep = false;
        }

        await interaction.reply({
            embeds: [embed],
            ephemeral: ep
        });
    }
}