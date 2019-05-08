import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Question from './Question';
import PageTitle from './PageTitle';

class QuestionResults extends Component{
    render(){
        const { id, showResults } = this.props;
        return(
            <Fragment>
                <PageTitle>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <Link to={`/`} className="btn btn-back"><i className="fa fa-long-arrow-left"></i> Back To Dashboard</Link>
                                <h1 className="align-self-center">{showResults ? "Question Results" : "Vote"}</h1>
                            </div>
                        </div>
                    </div>
                </PageTitle>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Question id={id} showResults={showResults}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps ({questions, authedUser}, props) {
    const id = props.match.params.id;
    return{
        id,
        showResults : true
    }
}

export default connect(mapStateToProps)(QuestionResults);