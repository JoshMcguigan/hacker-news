import rr from './redux-rest';

const topStories = rr.apiCall('https://hacker-news.firebaseio.com/v0/topstories.json');

const storyDetails = rr.apiCall(
    (storyId)=>{
        return `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    }
);

const searchStories = rr.apiCall(
    (queryString)=>{
        return `http://hn.algolia.com/api/v1/search?tags=story&query=${queryString}`;
    }
);

export default {
    topStories,
    storyDetails,
    searchStories
}