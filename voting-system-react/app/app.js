import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

// Component imports
import Main from 'Main';
import VotingFormScreen from './components/VotingFormScreen';
import VotingListScreen from './components/VotingListScreen';
import reducers from './reducers';


// App css
require('style!css!sass!applicationStyles')

const store = createStore(reducers, applyMiddleware(thunk, routerMiddleware(hashHistory)));
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={Main}>
                <Route path='votingFormScreen' component={VotingFormScreen} />
                <IndexRoute component={VotingListScreen} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
