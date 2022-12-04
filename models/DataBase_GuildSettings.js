const mongoose = require('mongoose');

const GuildSettingsSchema = new mongoose.Schema({
    guild_id: String,
    guild_name: String,

    moderator_role_id: String,
    
    welcome_channel_id: String,
    byebye_channel_id: String,

    verify_role_id: String,
});

module.exports = mongoose.model('GuildSettings', GuildSettingsSchema);