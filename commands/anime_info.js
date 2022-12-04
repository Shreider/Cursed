const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const malScraper = require('mal-scraper')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime_info')
        .setDescription("Display information about searched anime.")
        .addStringOption(option => option
            .setName('name')
            .setDescription('Set anime name.')
            .setRequired(true)
        ),

    async execute(client, interaction) {
        const name = interaction.options.getString('name');
        const embed = new MessageEmbed();

        await malScraper.getInfoFromName(name, false)
        .then((data) => {
            embed.setTitle(data.title)
            .setColor('RANDOM')
            .setThumbnail(data.picture)
            .setURL(data.url)
            .setDescription(`
                **English Title**\n${data.englishTitle ? data.englishTitle : '**None**'}\n\n
                **Synopsis**\n${data.synopsis ? data.synopsis : '**None**'}\n\n
                `)
            .setFields(
                //{name: 'English Title', value: data.englishTitle ? data.englishTitle : '**None**'},
                //{name: 'Synopsis', value: data.synopsis ? data.synopsis : '**None**'},
                {name: 'Episodes', value: data.episodes, inline: true},
                {name: 'Duration', value: data.duration, inline: true},
                {name: 'Status', value: data.status, inline: true},
                {name: 'Rating', value: data.rating},
                {name: 'Score', value: `${data.score} (${data.scoreStats})`, inline: true},
                {name: 'Ranked', value: data.ranked, inline: true},
                {name: 'Popularity', value: data.popularity, inline: true},
            )
        })

        interaction.reply({
            embeds: [embed],
            ephemeral: false
        });
    }
}