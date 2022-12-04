

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js');
const fetch = require('node-superfetch')
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('yt_stats')
    .setDescription("placecholder")
    .addStringOption(option => 
        option.setName('channel_name')
        .setDescription('Set channel name.')
        .setRequired(true)
    ),
    
    async execute(client, interaction) {
        /*
        
        const embed = new MessageEmbed();

        const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${interaction.options.getString('channel_name')}&key=${process.env.YOUTUBE_V3_KEY}&maxResults=1&type=channel`).catch(() => {return interaction.reply('Unknown channel error!')});
        if(!channel.body.items[0]) return interaction.reply('Channel not found!');

        const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${process.env.YOUTUBE_V3_KEY}`).catch(() => {return interaction.reply('Unknown channel data error!')});

        embed.setTitle('YouTube Statistics')
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .addFields(
                {name: 'Channel Name', value: channel.body.items[0].snippet.channelTitle, inline: true},
                {name: 'Subscribers Count', value: parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), inline: true},
                {name: 'Channel Description', value: channel.body.items[0].snippet.description},
                {name: 'Total Videos', value: parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), inline: true},
                {name: 'Total Views', value: parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), inline: true},
            )
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

        */
    }
} 
