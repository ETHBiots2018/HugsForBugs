import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

// Component imports
import Main from 'Main';
import VotingFormScreen from './components/VotingFormScreen';
import VotingListScreen from './components/VotingListScreen';

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(

    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <Route path='votingFormScreen' component={VotingFormScreen} />
            <IndexRoute component={VotingListScreen} />
        </Route>
    </Router>,
    document.getElementById('app')
);
