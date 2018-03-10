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
        this.props.getTopStories();
    }

    setActiveStory(storyId){
        this.setState({
            activeStoryId: storyId
        });
        this.props.loadStoryDetailsAction(storyId);
    }

    render() {

        console.log('rendering');
        console.log(this.props);

        const storyDetails = this.props.loadStoryDetailsState(this.state.activeStoryId);

        return (
            <div style={{display: 'flex', margin: '5%'}}>
                <div>
                    {this.props.bestStories.map((storyId, index)=>
                        <p
                            className='clickable'
                            key={storyId}
                            onClick={()=>this.setActiveStory(storyId)}
                        >{index} - {storyId}</p>
                    )}
                </div>
                <div>
                    {
                        storyDetails &&
                        <p>{storyDetails.title}</p>
                    }
                    {
                        !storyDetails &&
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
        loadStoryDetailsState: loadStoryDetails.state(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTopStories: () => dispatch(getTopStories().action),
        loadStoryDetailsAction: (storyId)=>dispatch(loadStoryDetails.action(storyId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);