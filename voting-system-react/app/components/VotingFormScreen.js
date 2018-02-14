// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Other imports
import {
    votingFormTitleChanged,
    votingFormDescriptionChanged,
    votingFormMinimumChanged
} from '../actions';

class VotingFormScreen extends Component {

    onCreateClick() {}

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
                    <div className='col'>
                        <div className='card'>
                            <div className='card-header'>
                                <div>
                                    Create new voting
                                </div>
                            </div>
							<div className='card-body'>
                                <form>
                                    <div className="form-group row">
                                        <div className="col">
                                            <label htmlFor="votingTitle">Title</label>
                                            <input
                                                id="votingTitle"
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter title of voting here..."
                                                value={this.props.title}
                                                onChange={(e) => this.props.votingFormTitleChanged(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <label htmlFor="description">Description</label>
                                            <textarea
                                                id="description"
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter description of voting here..."
                                                value={this.props.description}
                                                onChange={(e) => this.props.votingFormDescriptionChanged(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">                    
                                            <label htmlFor="addCampaignEndDate">Wei</label>
                                            <input
                                                id="minimum"
                                                className="form-control"
                                                type="number"
                                                placeholder="100"
                                                value={this.props.minimum}
                                                onChange={this.props.votingFormMinimumChanged.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    {this.renderError()}
                                    <button onClick={this.onCreateClick.bind(this)} className="btn btn-primary btn-block">Create</button>
                                </form>
							</div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    const { title, description, minimum } = state.votingForm;
    return { title, description, minimum };
};

export default connect(mapToProps, {
    votingFormTitleChanged,
    votingFormDescriptionChanged,
    votingFormMinimumChanged
})(VotingFormScreen);
