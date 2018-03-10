import rr from './redux-rest';

export const getTopStories = rr.apiCall('https://hacker-news.firebaseio.com/v0/topstories.json');
export const loadStoryDetails = rr.apiCall(['https://hacker-news.firebaseio.com/v0/item/', '.json'], rr.urlBuilders.zipper);
