import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/:section" component={Home}/>
                        <Route path="/:section/:page" component={Home}/>
                    </Switch>
                </Router>
            </Provider>
        );
    };
}

export default App;
