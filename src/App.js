import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getTopStories, loadStoryDetails} from "./actions";

class App extends Component {

    constructor(){
        super();
        this.state = {
            activeStoryId: null
        }
    }

    async componentDidMount(){
        this.props.getTopStoriesAction();
    }

    setActiveStory(storyId){
        this.setState({
            activeStoryId: storyId
        });
        this.props.loadStoryDetailsAction(storyId);
    }

    render() {

        const {activeStoryId} = this.state;
        const topStories = this.props.getTopStoriesState();
        const storyDetails = activeStoryId ? this.props.loadStoryDetailsState(activeStoryId) : null;

        return (
            <div id='appContainer'>
                <div>
                    {
                        topStories.isLoading &&
                        <p>Loading top stories..</p>
                    }
                    {
                        topStories.data &&
                        topStories.data.map((storyId, index)=>
                            <p
                                className={'clickable' + ((this.state.activeStoryId===storyId) ? ' selected' : '')}
                                key={storyId}
                                onClick={()=>this.setActiveStory(storyId)}
                            >{index} - {storyId}</p>
                        )
                    }
                </div>
                <div>
                    {
                        activeStoryId && storyDetails.data &&
                        <p>{storyDetails.data.title}</p>
                    }
                    {
                        (!activeStoryId || !storyDetails.isInitialized) &&
                        <p>No story selected</p>
                    }
                    {
                        activeStoryId && storyDetails.isLoading &&
                        <p>Loading story details..</p>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        getTopStoriesState: getTopStories.state(state),
        loadStoryDetailsState: loadStoryDetails.state(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTopStoriesAction: (...args) => dispatch(getTopStories.action(...args)),
        loadStoryDetailsAction: (...args) => dispatch(loadStoryDetails.action(...args))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);