import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Question from './Question';
import PageTitle from './PageTitle';

class QuestionResults extends Component{
    render(){
        const { id, showResults, show404 } = this.props;
        return(
            <Fragment>


            {!show404 && (
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
            )}
        {show404 && (
            <Fragment>
                <PageTitle>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <Link to={`/`} className="btn btn-back"><i className="fa fa-long-arrow-left"></i> Back To Dashboard</Link>
                                <h1 className="align-self-center">404 Error</h1>
                            </div>
                        </div>
                    </div>
                </PageTitle>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card--404 text-center p-4">
                                <p>The question you're looking for doesn't exist.</p>
                                <p>Try going back to the dashboard and selecting a different poll.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
            </Fragment>
        )
    }
}

function mapStateToProps ({questions, authedUser}, props) {
    const id = props.match.params.question_id;
    const show404 = questions[id] ? false : true;
    return{
        id,
        showResults : true,
        show404
    }
}

export default connect(mapStateToProps)(QuestionResults);