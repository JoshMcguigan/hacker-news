import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import reducer from './reducer'
import ReduxThunk from 'redux-thunk'

const store = createStore(
    reducer,
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
