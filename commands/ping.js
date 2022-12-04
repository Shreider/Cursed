const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Displays bot's interaction delay."),

    async execute(client, interaction) {
        const e = new MessageEmbed()
        .setTitle(`ping: ${client.ws.ping}ms`);

        interaction.reply({
            embeds: [e],
            ephemeral: true
        });
    }
}