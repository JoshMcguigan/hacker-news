import rr from './redux-rest';

const topStories = rr.apiCall('https://hacker-news.firebaseio.com/v0/topstories.json');
const storyDetails = rr.apiCall(['https://hacker-news.firebaseio.com/v0/item/', '.json'], rr.urlBuilders.zipper);

export default {
    topStories,
    storyDetails
}