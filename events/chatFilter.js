const DataBase_WorldFilter = require('../models/DataBase_Filter_cfg')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    on: true,

    async execute(message) {
        if(message.member.user.bot) return;
        let embed = new MessageEmbed();
        
        let msg = message.content.toLowerCase();
        
        let bMsg = false;
        let wordsMap = [];

        DataBase_WorldFilter.find((err, settings) => {
            settings.forEach(element => {wordsMap.push(element.wariations)})
            for(let i=0;i<wordsMap.length;i++) {
                for(let j=0;j<wordsMap[i].length;j++) {
                    if(msg.includes(wordsMap[i][j]) && !bMsg) bMsg = true
                }
            }

            if(message && bMsg) {
                embed.setTitle(`[ChatFilter] Message has been deleted!`).setFields({name: 'Member', value: `${message.author}`});
                message.channel.send({
                    embeds: [embed],
                });
                message.delete();
            };
        })
    }
}