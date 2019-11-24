import flatCache from 'flat-cache';
import path from 'path';

var cache = flatCache.load('google-search-store', path.join(__dirname, '../../store/'));

class RecentSearches {
    static getRecentSearches(id: string): any {
        return cache.getKey(id);
    }
    static addRecentSearches(id: string, query: string) {
        const searches = cache.getKey(id) || [];
        searches.push(query);
        cache.setKey(id, searches);
        cache.save();
    }
}

export default RecentSearches;