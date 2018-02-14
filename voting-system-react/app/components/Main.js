import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../actions';

import TopNavigation from './TopNavigation';

class Main extends Component {

    render() {
		// define props for child routes
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                state: this.state
            });
		});

        return (
            <div>
                <TopNavigation location={this.props.location} />
                <div className="container-fluid container-main">
                    {children}
                </div>
            </div>
        );
    }
}

const mapToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

export default connect(mapToProps, {})(Main);
