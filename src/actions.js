import axios from 'axios';

export const loadStoryDetails =
    {
        action: (storyId) => {
            return async (dispatch, getState) => {
                const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
                dispatch({type: 'storyLoaded', storyId, data: res.data})
            };
        },
        state: (state) => {
            return (storyId) => {
                return state[storyId];
            };
        }
    };

export const getTopStories =
    {
        action: () => {
            return async (dispatch, getState) => {
                const res = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
                dispatch({type: 'bestStoriesLoaded', data: res.data});
            }
        },
        state: (state) => {
            return () => {
                return state.getTopStoriesState;
            }
        }
    };
