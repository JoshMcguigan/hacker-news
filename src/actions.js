import axios from 'axios';

// const request = (url, config) => {
//     return {
//         action: (parameters) => {
//             return async (dispatch, getState) => {
//                 // build the url here using url and parameters
//                 const res = await axios(url, config);
//                 dispatch({type: 'API_CALL', data: res.data})
//             };
//         },
//         state: (state) => {
//             return (storyId) => {
//                 return state[storyId];
//             };
//         }
//     }
// };

export const loadStoryDetails =
    {
        action: (storyId) => {
            return async (dispatch, getState) => {
                const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
                const res = await axios.get(url);
                const data = res.data;
                dispatch({type: 'API_CALL', url, data})
            };
        },
        state: (state) => {
            return (storyId) => {
                const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
                return state[url] ? state[url] : {isInitialized: false, isLoading: false, error: '', data: undefined};
            };
        }
    };

export const getTopStories =
    {
        action: () => {
            return async (dispatch, getState) => {
                const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
                const res = await axios.get(url);
                const data = res.data;
                dispatch({type: 'API_CALL', url, data});
            }
        },
        state: (state) => {
            return () => {
                const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
                return state[url] ? state[url] : {isInitialized: false, isLoading: false, error: '', data: undefined};
            }
        }
    };
