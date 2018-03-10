import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import ReduxThunk from 'redux-thunk'
import {combineReducers} from "redux";
import rr from './redux-rest'

const store = createStore(
    combineReducers({API_CALL: rr.reducer}),
    applyMiddleware(
        ReduxThunk
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
