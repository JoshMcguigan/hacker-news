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
        this.props.loadStoryDetailsAction({urlParameters: [storyId]});
    }

    render() {

        const topStories = this.props.getTopStoriesState();
        const storyDetails = this.props.loadStoryDetailsState({urlParameters: [this.state.activeStoryId]});

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
                        storyDetails.data &&
                        <p>{storyDetails.data.title}</p>
                    }
                    {
                        !storyDetails.isInitialized &&
                        <p>No story selected</p>
                    }
                    {
                        storyDetails.isLoading &&
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
        getTopStoriesAction: () => dispatch(getTopStories.action()),
        loadStoryDetailsAction: (parameters) => dispatch(loadStoryDetails.action(parameters))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);