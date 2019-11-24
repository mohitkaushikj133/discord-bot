import { Message } from 'discord.js';
import RecentGoogleSearches from './googleSearchesStore';

const finalRes = (query: string, data: any[]) => {
    let fiveRes = data.slice(0,5);
    let finalMsg = 'Recent searches are ' + "\n\n";
    fiveRes.forEach((rows: any) => {
        finalMsg += rows + "\n";
    });
    return finalMsg;
}

const getRecentSearches = (id: string, query: string):string[] => {
    const searches: string[] = RecentGoogleSearches.getRecentSearches(id);
    if(typeof searches === 'undefined') {
        return [];
    }
    const filtered = searches.filter((search) => {
        return search.indexOf(query) >= 0;
    });
    return filtered;
}

export const recentSearches = async (message: Message) => {
    const query = message.content.replace('!recent', '');
    try {
        const results = getRecentSearches( message.author.id, query);
        const finalResult = finalRes(query, results);
        console.log(finalResult);
        message.reply(finalResult);
    } catch (e) {
        message.reply('Unable to search');
        console.log(e);
    }
};