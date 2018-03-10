const reducer = (state = {}, action) => {

    console.log(action);

    if(action.type === 'API_CALL'){
        switch (action.state) {
            case 'LOADING':
                return {...state, [action.url]: {...state[action.url], isInitialized: true, isLoading: true, error: ''}};
            case 'SUCCESS':
                return {...state, [action.url]: {isInitialized: true, isLoading: false, error: '', data: action.data}};
            case 'ERROR':
                return {...state, [action.url]: {...state[action.url], isInitialized: true, isLoading: false, error: action.error}};
            default:
                throw Error('Unknown API_CALL state passed to Redux reducer')
        }
    }

    return state;
};

export default reducer;