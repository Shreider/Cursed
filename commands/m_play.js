const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription(`Play music :)"`)
        .addStringOption(option => option
            .setName('term')
            .setDescription('Song or Playlist to search')
            .setRequired(true)
        ),

    async execute(client, interaction) {

        const embed = new MessageEmbed();

        if(!interaction.member.voice.channel) {
            embed
                .setTitle(`You must be connected to Voice Channel.`)
            await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            return;
        }

        const queue = await client.player.createQueue(interaction.guild);
        let term = interaction.options.getString('term');

        if(!term.includes('&list=') || (!term.includes('&index='))) {
            const result = await client.player.search(term, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_SEARCH,
            });

            if(result.tracks.length === 0) {
                embed
                    .setTitle(`Invalid search value or no song found.`)
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
                return;
            }

            const song = result.tracks[0];
            await queue.addTrack(song);

            embed
                .setTitle(`**${song.title}** has been added to queue.`)
            interaction.reply({
                embeds: [embed],
                ephemeral: false
            });
        }
        else {
            const result = await client.player.search(term, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });

            if(result.tracks.length === 0) {
                embed
                    .setTitle(`Invalid search value or no playlist found.`)
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
                return;
            }

            const playlist = result.playlist;
            await queue.addTracks(result.tracks);

            embed
                .setTitle(`**${result.tracks.length}** songs from **${playlist.title}** has been added to queue.`)
            interaction.reply({
                embeds: [embed],
                ephemeral: false
            });
        }

        if(!queue.connection) await queue.connect(interaction.member.voice.channel);
        if(!queue.playing) await queue.play();
    }
}