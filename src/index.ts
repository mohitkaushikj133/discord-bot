require('dotenv').config()
import { CONFIG } from './config';
import { Client } from 'discord.js';
import  { googleSearch } from './modules/googleSearch';
import { recentSearches } from './modules/getRecentSearches';
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.tag} has Logged in`);
});

client.on('message', msg => {
    console.log('msg.content ......', msg.content);
    if (msg.content.toLowerCase() === 'hi') {
        if (msg.author.username !== process.env.BOT_NAME) {
            msg.reply('Hey');
        }
        return;
    }

    if (msg.content.startsWith('!google')) {
        googleSearch(msg);
        return;
    }

    if (msg.content.startsWith('!recent')) {
        recentSearches(msg);
        return;
    }

    if (msg.content.startsWith('!help')) {
        msg.reply('\n\n Discord Bot is in your service. \n\n' +  'Commands supported by bot are  - \n\n **!google** ..query \n\n **!recent** ..query \n\n **!help** \n\n');
        return;
    }

    if (msg.author.username !== process.env.BOT_NAME) {
        msg.channel.send('Unable to understand! \n\n\n' + 'These commands are supported - \n\n **!google** [query] \n\n **!recent** ?[query] \n\n **!help** \n\n');
    }

});

client.login(process.env.TOKEN);

