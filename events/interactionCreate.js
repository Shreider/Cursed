const client = require('./../index');

module.exports = {
    name: 'interactionCreate',
    on: true,

    async execute(interaction) {
        if(interaction.isButton()) return; //Buttons interactions should to be executed in dedicated file! (./../commands/btnInteractions OR ./../events/btnInteractions)
        if(interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if(!command) return;
        
            try {
                await command.execute(client, interaction)
            } catch(err) {
                if(err) {
                    if(err) console.error(err);
                    await interaction.reply({
                        content: 'An error occurred while executing that command. Bot probably crashed!',
                        ephemeral: true
                    });
                }
            }
        }
    }
}
