const defaultState = {
    bestStories: [],
    activeStory: null
};

const reducer = (state = defaultState, action) => {
    let newState = {...state};

    if (action.type ==='bestStoriesLoaded'){
        newState.bestStories = action.data
    }

    if (action.type ==='activeStoryLoaded'){
        newState.activeStory = action.data
    }

    return newState;
};

export default reducer;