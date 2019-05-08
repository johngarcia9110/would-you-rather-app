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
                {showResults === true && hasAnswered && (
                    <Fragment>
                        <div className={hasAnswered  === "optionOne" ? "option option__result selected" : "option option__result"}>
                            <p>
                                {question.optionOne.text}
                                {hasAnswered === "optionOne" && (
                                    <span className="vote-flag">Your Selection</span>
                                )}
                            </p>
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
                        </div>
                        <p className="text-center answerSeperator">...OR...</p>
                        <div className={hasAnswered === "optionTwo" ? "option option__result selected" : "option option__result"}>
                            <p>
                                {question.optionTwo.text}
                                {hasAnswered === "optionTwo" && (
                                    <span className="vote-flag">Your Selection</span>
                                )}
                            </p>
                            <div className="votebar">
                                <div className="progressBar"
                                     style={{width: optionTwoPercentage}}
                                ><span>{optionTwoPercentage}</span></div>
                            </div>
                        </div>
                    </Fragment>
                )}
                { showResults && !hasAnswered &&(
                    <Fragment>
                        <div className="option option__vote">
                            <p>{question.optionOne.text}</p>
                            <button onClick={() => this.handleVote("optionOne")} className="btn btn-secondary">Vote</button>
                        </div>
                        <p className="text-center answerSeperator">...OR...</p>
                        <div className="option option__vote">
                            <p>{question.optionTwo.text}</p>
                            <button onClick={() => this.handleVote("optionTwo")} className="btn btn-secondary">Vote</button>
                        </div>
                    </Fragment>
                )
                }
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