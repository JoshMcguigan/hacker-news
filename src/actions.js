import axios from 'axios';

const urlBuilders = {
    zipper: (url, args) => {
        // url = ['https://hacker-news.firebaseio.com/v0/item/', '.json']
        // args = ['1234']
        let fullURL = url[0];
        args.forEach((arg, i)=>{
            fullURL += arg + url[i+1];
        });
        // fullURL = 'https://hacker-news.firebaseio.com/v0/item/1234.json'
        return fullURL;
    }
};

const apiCall = (url, urlBuilder) => {
    return {
        action: (...args) => {
            return async (dispatch, getState) => {
                const fullURL = urlBuilder ? urlBuilder(url, args): url;
                dispatch({type: 'API_CALL', state: 'LOADING', url: fullURL});
                try {
                    const res = await axios.get(fullURL);
                    const data = res.data;
                    dispatch({type: 'API_CALL', state: 'SUCCESS', url: fullURL, data});
                } catch (e) {
                    const error = e.toString();
                    dispatch({type: 'API_CALL', state: 'ERROR', url: fullURL, error});
                }
            };
        },
        state: (state) => {
            return (...args) => {
                const fullURL = urlBuilder ? urlBuilder(url, args): url;
                return state[fullURL] ? state[fullURL] : {isInitialized: false, isLoading: false, error: '', data: undefined};
            };
        }
    };
};

export const getTopStories = apiCall('https://hacker-news.firebaseio.com/v0/topstories.json');
export const loadStoryDetails = apiCall(['https://hacker-news.firebaseio.com/v0/item/', '.json'], urlBuilders.zipper);
