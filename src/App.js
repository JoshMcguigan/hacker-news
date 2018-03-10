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

        const topStories = this.props.getTopStoriesState();
        const storyDetails = this.props.loadStoryDetailsState(this.state.activeStoryId);

        return (
            <div style={{display: 'flex', margin: '5%'}}>
                <div>
                    {
                        topStories.data &&
                        topStories.data.map((storyId, index)=>
                            <p
                                className='clickable'
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
                        !storyDetails.data &&
                        <p>No story selected</p>
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
        loadStoryDetailsAction: (storyId) => dispatch(loadStoryDetails.action(storyId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);