import axios from 'axios';

export function loadStoryDetails(storyId) {
    const action = async (dispatch, getState) => {
        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
        dispatch({type: 'storyLoaded', storyId, data: res.data})
    };

    const state = (state) => {
        console.log('in state');
        console.log(state);
        console.log(storyId);
        return state[storyId];
    };

    return {action, state};
}

export function getTopStories() {

    const action = async (dispatch, getState) => {
        const res = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        dispatch({type: 'bestStoriesLoaded', data: res.data});
    };

    const state = (state) => {
        return state.bestStories;
    };

    return {action, state};
}

