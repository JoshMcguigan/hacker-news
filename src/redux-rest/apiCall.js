import axios from 'axios';

const apiCall = (urlBuilder) => {
    return {
        request: (...args) => {
            return async (dispatch, getState) => {
                const fullURL = (urlBuilder instanceof Function) ? urlBuilder(...args) : urlBuilder;
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
        retrieve: (state) => {
            return (...args) => {
                const fullURL = (urlBuilder instanceof Function) ? urlBuilder(...args) : urlBuilder;
                return state['API_CALL'][fullURL] ? state['API_CALL'][fullURL] : {isInitialized: false, isLoading: false, error: '', data: undefined};
            };
        }
    };
};

export default apiCall;