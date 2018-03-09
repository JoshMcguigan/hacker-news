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
        this.props.dispatch(this.props.loadStoryDetails(storyId).action);
    }

    render() {

        console.log('rendering');
        console.log(this.props.loadStoryDetails(this.state.activeStoryId).state(this.props.state));

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
                        this.props.loadStoryDetails(this.state.activeStoryId).state(this.props.state) &&
                        <p>{this.props.loadStoryDetails(this.state.activeStoryId).state(this.props.state).title}</p>
                    }
                    {
                        !this.props.loadStoryDetails(this.state.activeStoryId).state(this.props.state) &&
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
        state: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTopStories: () => {
            dispatch(getTopStories().action)
        },
        dispatch: dispatch,
        loadStoryDetails
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);