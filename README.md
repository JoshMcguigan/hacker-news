This project is an attempt to develop a boilerplate free workflow for managing web API interactions and state using redux and redux-thunk. The hacker news API is used as the backend.

## Run the demo application
```
npm install
npm start
```

## Developer Documentation

#### Connecting the API to components

```
// if this is your existing redux connect statement
// connect(mapStateToProps, mapDispatchToProps)(Component)
// then you would replace that connect statement with the statement below to connect your API

import rr from './redux-rest';
import api from './actions';
rr.connect(api, mapStateToProps, mapDispatchToProps)(Component)
```

#### Making API calls from within a component

The API is mapped into the props for any connected component. Functions which trigger a network request for each API call are exposed in the request object within the component props.

```
// This triggers a network request to retrieve the story details for a given story ID
this.props.request.storyDetails(storyId)
``` 

#### Reading API response data from within a component

The API responses are mapped into the props for any connected component. Functions which retrieve the response data for each API call are exposed in the retrieve object within the component props.

```
// This retrieves the API response for the story details for a given story ID
this.props.retrieve.storyDetails(activeStoryId)
``` 

Calls to retrieve API response data return an object as defined below:

```
{
    isInitialized,
    isLoading,
    error,
    data
]
```

The values for isInitialized, isLoading, error, and data are updated automatically when API requests are made. 

#### Defining the API

The API is defined by an object whose keys are the names of the API calls, and the values are apiCall objects. 

For simple API calls, without any parameters, the setup is as shown below. If there is only one argument passed to apiCall, it must be a string which is the URL that will be used to request data (currently only GET requests are supported).

```
const topStories = rr.apiCall('https://hacker-news.firebaseio.com/v0/topstories.json');
```

For more complex URLs, containing either URL parameters or query parameters, apiCall takes a URL builder function as an argument.

The URL builder function will be passed the arguments in the same order that they are passed to the calls to request and retrieve data within components. An example is shown below:
 
```
const searchStories = rr.apiCall(
    (queryString)=>{
        return `http://hn.algolia.com/api/v1/search?tags=story&query=${queryString}`;
    }
);
    
// a component would trigger this request with this.props.request.searchStories('foo')
```

#### Setup the reducer

The reducer handles storing the state of each API request. It uses the 'API_CALL' key within the root of the redux store as shown below. It is possible to use other reducers alongside it if there is other state within your project that needs to be managed by redux.

```
const store = createStore(
    combineReducers({API_CALL: rr.reducer}),
    applyMiddleware(
        ReduxThunk
    )
);

```