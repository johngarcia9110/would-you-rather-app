import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QuestionDetails from './QuestionDetails';

class Question extends Component {
    render() {
        const {
            authedUser,
            question,
            questionAuthor,
            users,
            showResults
        } = this.props;

        const hasAnswered = users[authedUser].answers[question.id] ? users[authedUser].answers[question.id] : false;

        return (
            <div className="col-12 card question-card">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-4 question-card__author-column">
                        {questionAuthor && (
                            <div className="question-card__author">
                                <p>{questionAuthor ? questionAuthor.name : ""} asks</p>
                                <img src={questionAuthor.avatarURL} alt="author profile image"/>
                            </div>
                        )}

                    </div>
                    <div className="col-8 question-card__question-column">
                        <QuestionDetails hasAnswered={hasAnswered} question={question} showResults={showResults}/>
                    </div>
                    <div className="controls">
                        <Link to={`/questions/${question.id}`} className="btn btn-primary">View Poll</Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, { id, showResults }){

    const question = questions[id];
    const questionAuthor = users[question.author];

    return{
        question,
        questionAuthor,
        users,
        authedUser,
        showResults
    }
}

export default connect(mapStateToProps)(Question);