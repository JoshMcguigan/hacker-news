import axios from 'axios';

const apiCall = (url) => {
    const buildFullURL = (url, parameters) => {
        // url = ['https://hacker-news.firebaseio.com/v0/item/', '.json']
        // parameters = { urlParameters: ['1234'] }
        let fullURL = url[0];
        if(parameters && parameters.urlParameters){
            parameters.urlParameters.forEach((parameter, i)=>{
                fullURL += parameter + url[i+1];
            });
        }
        // fullURL = 'https://hacker-news.firebaseio.com/v0/item/1234.json'
        return fullURL;
    };

    return {
        action: (parameters) => {
            return async (dispatch, getState) => {
                const fullURL = buildFullURL(url, parameters);
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
            return (parameters) => {
                const fullURL = buildFullURL(url, parameters);
                return state[fullURL] ? state[fullURL] : {isInitialized: false, isLoading: false, error: '', data: undefined};
            };
        }
    };
};

export const getTopStories = apiCall(['https://hacker-news.firebaseio.com/v0/topstories.json']);
export const loadStoryDetails = apiCall(['https://hacker-news.firebaseio.com/v0/item/', '.json']);
