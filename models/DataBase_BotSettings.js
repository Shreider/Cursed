const mongoose = require('mongoose');

const BotSettingsSchema = new mongoose.Schema({
    id: String,
    activityOn: Boolean,
    bot_game_content: String,
    bot_game_type: String,
    bot_status: String,
});

module.exports = mongoose.model('BotSettings', BotSettingsSchema);