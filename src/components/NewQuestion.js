import React, { Component, Fragment } from 'react';
import PageTitle from './PageTitle';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class NewQuestion extends Component{
    state = {
        optionOneText : '',
        optionTwoText : '',
        errorMessage : null,
        questionSubmitted : false
    };

    handleChange = (e, option) => {
        const text = e.target.value;
        if(option === 'optionOne'){
            this.setState({
                optionOneText : text
            })
        }else{
            this.setState({
                optionTwoText : text
            })
        }
    }

    handleSubmitNewQuestion = () => {
        const { dispatch, authedUser } = this.props;
        const { optionOneText, optionTwoText } = this.state;
        if(optionOneText.length < 1 || optionTwoText.length < 1){
            this.setState({
                errorMessage : "Please input text for both answer fields"
            });
        }else{
            dispatch(handleAddQuestion({
                author : authedUser,
                optionOneText : this.state.optionOneText,
                optionTwoText : this.state.optionTwoText
            })).then(
                this.setState({
                    questionSubmitted : true
                })
            );
        }

    }

    render(){
        if(this.state.questionSubmitted === true){
            return <Redirect to='/'/>
        }
        return(
            <Fragment>
                <PageTitle>
                    <div className="col-12">
                        <h1 className="text-center">Create A New Question</h1>
                    </div>
                </PageTitle>
                <div className="container">
                    <div className="row">
                        <div className="col-8 offset-2">
                            <div className="card new-question-card">
                                <h3 className="text-center">Would you rather..</h3>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="answerOne"
                                        className="form-control"
                                        placeholder="Answer One"
                                        onChange={(e)=>this.handleChange(e,'optionOne')}
                                    />
                                </div>
                                <p className="text-center answerSeperator">...OR...</p>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="answerTwo"
                                        className="form-control"
                                        placeholder="Answer Two"
                                        onChange={(e)=>this.handleChange(e,'optionTwo')}
                                    />
                                </div>
                                <div className="error">
                                    { this.state.errorMessage &&(
                                        <p>{this.state.errorMessage}</p>
                                    )}
                                </div>
                                <div className="controls">
                                    <button type="button" className="btn" onClick={this.handleSubmitNewQuestion}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);