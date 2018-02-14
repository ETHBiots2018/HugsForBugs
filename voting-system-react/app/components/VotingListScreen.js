import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import {} from '../actions';

class VotingListScreen extends Component {

    componentWillMount() {
        //this.props.getVotings();
    }
    
    onAddVotingClick() {
        hashHistory.push()
    }

    renderVotings() {
        return this.props.votings.map(voting => {
            return (
                <li key={voting.title} className='list-group-item'>{voting.title}</li>
            );
        });
    }

    renderError() {
        const { error } = this.props;
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                  { error }
                </div>
            );
        }
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col"></div>
                    <div className="col">
                        <div className='card'>
                            <div className='card-header'>
                                <div className='dashboard-card-header'>
                                    Alle Wahlen
                                    <button type="button" className="btn btn-primary btn-sm" onClick={this.onAddVotingClick.bind(this)}>Hinzufügen</button>
                                </div>
                            </div>
                            <ul className='list-group list-group-flush'>
                                {this.renderVotings()}
                            </ul>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    const { votings } = state.votingList;
    return { votings };
};

export default connect(mapToProps, {})(VotingListScreen);
