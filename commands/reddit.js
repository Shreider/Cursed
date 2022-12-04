const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription("Sending post from reddit.")
        .addStringOption(option => option
            .setName('subreddit')
            .setDescription('Select a subreddit.')
            .setRequired(true)
            .addChoices(
                {name: 'meme', value: 'meme'},
                {name: 'funny', value: 'funny'},
                {name: 'gifs', value: 'gifs'},
                {name: 'hentai', value: 'hentai'}
            )),
    async execute(client, interaction) {
        const data = await fetch(`https://meme-api.herokuapp.com/gimme/${interaction.options.getString('subreddit')}`).then(res => res.json());

        const e_post = new MessageEmbed()
        .setTitle(data.title)
        .setURL(data.postLink)
        .setColor('#ff1a8c')
        .setImage(data.url)
        .setFooter(`upvotes: ${data.ups} • subreddit: r/${data.subreddit}`)

        interaction.reply({
            embeds: [e_post]
        });
    }
}