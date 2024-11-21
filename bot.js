require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const axios = require('axios');
const keep_alive = require('./keep_alive.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences] });
client.once('ready', () => {
    console.log('Bot is online!');

    // Update the bot's status every minute
    setInterval(updateStatus, 60000);
    updateStatus(); // Initial status update
});

async function updateStatus() {
    const guild = client.guilds.cache.first(); // Get the first guild the bot is in
    if (guild) {
        const totalMembers = guild.memberCount; // Total number of members
        const onlineMembers = guild.members.cache.filter(member => member.presence?.status === 'online').size; // Count of online members

        // Set the bot's status to show online members vs total members
        client.user.setActivity(`[ ${onlineMembers} / ${totalMembers} ] on NOCHIZUU`, { type: ActivityType.Watching });
    }
}

client.login(process.env.BOT_TOKEN);