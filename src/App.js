import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getTopStories, loadStoryDetails} from "./actions";

class App extends Component {

    async componentDidMount(){
        this.props.getTopStories();
    }

    render() {
        return (
            <div style={{display: 'flex', margin: '5%'}}>
                <div>
                    {this.props.bestStories.map((storyId, index)=>
                        <p
                            className='clickable'
                            key={storyId}
                            onClick={()=>this.props.loadStoryDetails(storyId)}
                        >{index} - {storyId}</p>
                    )}
                </div>
                <div>
                    {
                        this.props.activeStory &&
                        <p>{this.props.activeStory.title}</p>
                    }
                    {
                        !this.props.activeStory &&
                        <p>No story selected</p>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        bestStories: getTopStories().state(state),
        activeStory: state.activeStory
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTopStories: () => {
            dispatch(getTopStories().action)
        },
        loadStoryDetails: (storyId) => {
            dispatch(loadStoryDetails(storyId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);