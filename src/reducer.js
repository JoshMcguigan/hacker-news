const reducer = (state = {}, action) => {

    console.log(action);

    let newState = {...state};

    if(action.type === 'API_CALL'){
        newState[action.url] = action.data;
    }

    return newState;
};

export default reducer;