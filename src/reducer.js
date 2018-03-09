const defaultState = {
    bestStories: [],
    activeStory: null
};

const reducer = (state = defaultState, action) => {

    console.log(action);

    let newState = {...state};

    if (action.type ==='bestStoriesLoaded'){
        newState.bestStories = action.data
    }

    if (action.type ==='storyLoaded'){
        newState[action.storyId] = action.data
    }

    return newState;
};

export default reducer;