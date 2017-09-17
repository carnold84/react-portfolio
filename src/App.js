import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './store/reducers';
import { fetchData } from './store/data/actions';

import Home from './containers/Home';

const store = createStore(
    combineReducers(reducers),
    compose(
        applyMiddleware(thunkMiddleware), 
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);

store.dispatch(fetchData());

class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    };
}

export default App;
