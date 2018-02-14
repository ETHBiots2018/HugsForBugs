import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';


class TopNavigation extends Component {

    render() {
        const { pathname } = this.props.location;

        return (
            <nav className="navbar fixed-top navbar-expand navbar-light bg-light">
			 	<a className="navbar-brand" href="#/">VotingSystem</a>
			  	<div className="collapse navbar-collapse" id="navbarNav">
			    	<ul className="navbar-nav navbar-right">
			      		<li className="nav-item">
			        		<a className="nav-link" href="#/">Alle Wahlen</a>
			      		</li>
			      		<li className="nav-item">
			        		<a className="nav-link" href="#/votingFormScreen">Wahl erstellen</a>
			      		</li>
			    	</ul>
			  	</div>
			</nav>
        );
    }
}

const mapToProps = (state) => {
    const {} = state.auth;
    return {};
};

export default connect(mapToProps)(TopNavigation);
