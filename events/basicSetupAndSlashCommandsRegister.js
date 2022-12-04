const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
require('dotenv').config();
const cmd_color = require('chalk');
var packageJSON = require('../package.json');

module.exports = {
    name: 'ready',
    on: true,
    
    execute(client, commands) {
        console.log(cmd_color.green(`Successfully logged as ${client.user.tag} (app ver. ${packageJSON.version}).`));
        
        //identification of the REST
        const rest  = new REST({
        version: '10'
        }).setToken(process.env.TOKEN);

        //register shalh commands
        //global
        (async () => {
            try {
                console.log(cmd_color.yellow('Started refreshing application (/) commands and events...'));

                await rest.put(Routes.applicationCommands(process.env.APP_ID), {
                    body: commands,
                });
                console.log(cmd_color.green('Successfully reloaded application (/) commands and events, globally.'));
            }
            catch (error) {
                console.error(error);
            }
        })();

        //local
        /*(async () => {
            try {
                console.log(cmd_color.yellow('Started refreshing application (/) commands and events.'));

                await rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), {
                        body: commands
                });
                console.log(cmd_color.green('Successfully reloaded application (/) commands and events, ') + cmd_color.yellow('locally') + cmd_color.green('.'));
            }
            catch (error) {
                console.error(error);
            }
        })()*/
    }
}