import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class NewQuestion extends Component{
    state = {
        optionOneText : '',
        optionTwoText : '',
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

    render(){
        if(this.state.questionSubmitted === true){
            return <Redirect to='/'/>
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="mb-4 text-center">Create A New Question</h1>
                        <p>{this.state.author}</p>
                    </div>
                    <div className="col-12">
                        <div className="new-question-card">
                            <p className="text-center">Would you rather..</p>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="answerOne"
                                    className="form-control"
                                    placeholder="Answer One"
                                    onChange={(e)=>this.handleChange(e,'optionOne')}
                                />
                            </div>
                            <p className="text-center">or</p>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="answerTwo"
                                    className="form-control"
                                    placeholder="Answer Two"
                                    onChange={(e)=>this.handleChange(e,'optionTwo')}
                                />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmitNewQuestion}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);