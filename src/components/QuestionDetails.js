import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { handleSaveQuestionAnswer } from "../actions/questions";

class QuestionDetails extends Component  {
    state = {
        answerSubmitted : false
    };

    handleVote = (answer) => {
        const {authedUser, dispatch} = this.props;
        const qid = this.props.question.id;
        dispatch(handleSaveQuestionAnswer(answer, authedUser, qid))
            .then(this.setState({
                answerSubmitted : true,
                showResults : true
            }))
    }

    render(){
        if(this.state.questionSubmitted === true){
            return <Redirect to='/'/>
        }
        const {
            optionOneTotal,
            optionTwoTotal,
            totalVotes,
            optionOnePercentage,
            optionTwoPercentage,
            question,
            users,
            hasAnswered,
            showResults
        } = this.props;


        return (
            <div className="question-card__question">
                <h3>Would you rather...</h3>
                {showResults === false && (
                        <div className="option">
                            <p>...{question.optionOne.text}...</p>
                        </div>
                    )}
                {showResults === true && (
                    <Fragment>
                        <div className={hasAnswered  === "optionOne" ? "option selected" : "option"}>
                            <p className="mb-2">{question.optionOne.text}{question.optionOne.votes.length}</p>
                            {
                                hasAnswered && (
                                    <div className="votebar">
                                        {optionOnePercentage !== '0%' && (
                                            <div className="progressBar"
                                                 style={{
                                                     width: optionOnePercentage
                                                 }}>
                                                <span>{optionOnePercentage}</span>
                                            </div>
                                        )}
                                        {optionOnePercentage === '0%' && (
                                            <p>{optionOnePercentage}</p>
                                        )}
                                    </div>
                                )
                            }
                            {!hasAnswered && (
                                <button onClick={() => this.handleVote("optionOne")} className="btn btn-secondary">Vote</button>
                            )}
                        </div>
                        <p className="text-center answerSeperator">OR</p>
                        <div className={hasAnswered === "optionTwo" ? "option selected" : "option"}>
                            <p className="mb-2">{question.optionTwo.text}</p>
                            {
                                hasAnswered && (
                                    <div className="votebar">
                                        <div className="progressBar"
                                             style={{width: optionTwoPercentage}}
                                        ><span>{optionTwoPercentage}</span></div>

                                    </div>
                                )
                            }

                            {!hasAnswered && (
                                <button onClick={() => this.handleVote("optionTwo")} className="btn btn-secondary">Vote</button>
                            )}
                        </div>
                    </Fragment>
                )}
            </div>

        )
    }
}

function mapStateToProps({users}, {id, hasAnswered, question, showResults}){

    const optionOneTotal = question.optionOne.votes.length;
    const optionTwoTotal = question.optionTwo.votes.length;
    const totalVotes = optionOneTotal + optionTwoTotal;
    const optionOnePercentage = Math.floor(optionOneTotal / totalVotes * 100) + "%";
    const optionTwoPercentage = Math.floor(optionTwoTotal / totalVotes * 100) + "%";

    return{
        optionOneTotal,
        optionTwoTotal,
        totalVotes,
        optionOnePercentage,
        optionTwoPercentage,
        question,
        users,
        hasAnswered,
        showResults
    }
}

export default connect(mapStateToProps)(QuestionDetails);