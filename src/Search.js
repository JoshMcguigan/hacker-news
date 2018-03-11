import React, { Component } from 'react';
import api from "./actions";
import rr from "./redux-rest";

class Search extends Component {

    constructor(){
        super();
        this.state = {
            searchText: ''
        }
    }

    updateSearchText = (e) => {

        const searchText = e.target.value;

        this.setState({
            searchText
        });

        if (searchText){
            this.props.request.searchStories(searchText);
        }
    };

    render() {

        const {searchText} = this.state;
        const results = this.props.retrieve.searchStories(searchText);

        return (
            <div>
                <h2>Search</h2>
                <input type='text' onChange={this.updateSearchText} value={searchText}></input>
                {
                    results.isInitialized && results.isLoading &&
                    <p>Loading..</p>
                }
                {
                    results.isInitialized && results.data &&
                    results.data.hits.map((result)=><p key={result.objectID}>{result.title}</p>)
                }
            </div>
        );
    }
}

export default rr.connect(api)(Search);