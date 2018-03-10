const reducer = (state = {}, action) => {

    console.log(action);

    if(action.type === 'API_CALL'){
        return {...state, [action.url]: {data: action.data}};
    }

    return state;
};

export default reducer;