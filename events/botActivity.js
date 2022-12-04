//OLD SCRIPT
/*const { BOT_ACTIVITY } = require('./../config.json')

module.exports = {
    name: 'ready',
    on: true,

    async execute(client) {
        //client.user.setActivity(`${BOT_ACTIVITY.text}`, {type: `${BOT_ACTIVITY.type}`});

        client.user.setPresence({
            activities: [
                {
                    name: BOT_ACTIVITY.content,
                    type: BOT_ACTIVITY.type
                }
            ],
            status: BOT_ACTIVITY.status
        });
    }
}*/

const BotSettings = require('../models/DataBase_BotSettings');

module.exports = {
    name: 'ready',
    on: true,

    async execute(client) {
        setInterval(() => {
            BotSettings.findOne({ id: 'BotActivity' }, (err, settings) => {
                if(err) {
                    console.error(`An error has occurred: ${err}`);
                    return;
                };
                if(settings.activityOn === true) {
                    client.user.setPresence({
                        activities: [
                            {
                                name: settings.bot_game_content,
                                type: settings.bot_game_type
                            }
                        ],
                        status: settings.bot_status
                    });
                }
            })  
        }, 60000*2);
    }
}