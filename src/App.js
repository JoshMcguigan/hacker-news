import React, { Component } from 'react';
import api from "./actions";
import rr from "./redux-rest";
import Search from "./Search";

class App extends Component {

    constructor(){
        super();
        this.state = {
            activeStoryId: null
        }
    }

    componentDidMount(){
        this.props.request.topStories();
    }

    setActiveStory(storyId){
        this.setState({
            activeStoryId: storyId
        });
        this.props.request.storyDetails(storyId);
    }

    render() {

        const {activeStoryId} = this.state;
        const topStories = this.props.retrieve.topStories();
        const storyDetails = activeStoryId ? this.props.retrieve.storyDetails(activeStoryId) : null;

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
                <div>
                    <Search />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        exampleStateToProps: 'demo'
    }
};

const mapDispatchToProps = dispatch => {
    return {
        exampleDispatchToProps: 'demo'
    }
};

// the mapStateToProps and mapDispatchToProps arguments here are optional, in case you need to add additional redux state
export default rr.connect(api, mapStateToProps, mapDispatchToProps)(App);