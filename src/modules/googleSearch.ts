import { Message } from 'discord.js';
import { CONFIG } from '../config';
import axios from 'axios';
import RecentGoogleSearches from './googleSearchesStore';

const url = 'https://www.googleapis.com/customsearch/v1';
const finalRes = (query: string, data: any[]) => {
    let fiveRes = data.slice(0,5);
    let finalMsg = "";
    fiveRes.forEach((rows: any) => {
        finalMsg += rows.title + "\n" + rows.link + "\n" + rows.snippet + "\n\n";
    });
    return finalMsg;
}

const fetchResultsFromGoogle = async (query: string) => {
    const { data } = await axios.get(url, {
        params: {
            key: process.env.GOOGLE_KEY,
            cx: CONFIG.googleCustomSearchEngine,
            q: query
        }
    });
    return data.items;
}

export const googleSearch = async (message: Message) => {
    const query = message.content.replace('!google', '');
    try {
        const id = message.author.id;
        const results = await fetchResultsFromGoogle(query);
        const finalResult = finalRes(query, results);
        message.reply(finalResult); // reply to bot 
        console.log(finalResult); // console on node
        RecentGoogleSearches.addRecentSearches(id, query); // add to store
    } catch (e) {
        console.log(e);
        message.reply('Unable to search');
    }
};