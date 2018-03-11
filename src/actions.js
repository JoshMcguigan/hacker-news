import rr from './redux-rest';

const topStories = rr.apiCall('https://hacker-news.firebaseio.com/v0/topstories.json');
const storyDetails = rr.apiCall(['https://hacker-news.firebaseio.com/v0/item/', '.json'], rr.urlBuilders.zipper);

const queryBuilder = (url, queryObject) => {
    let queryStrings = [];
    Object.keys(queryObject).forEach((queryKey)=>{
        queryStrings.push(`${queryKey}=${queryObject[queryKey]}`)
    });

    return `${url}?${queryStrings.join('&')}`;
};
const searchStories = rr.apiCall(['http://hn.algolia.com/api/v1/search'],
        (url, [queryString])=>{
            return queryBuilder(url, {query: queryString, tags: 'story'});
        }
    );

export default {
    topStories,
    storyDetails,
    searchStories
}