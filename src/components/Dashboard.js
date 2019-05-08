import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PageTitle from './PageTitle';
import Question from './Question';

class Dashboard extends Component {
    state = {
        questionView : 'unanswered'
    }
    handleViewChange = (questionView) => {
        this.setState({
            questionView
        })
    }
    render() {
        return (
            <Fragment>
                <PageTitle>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-between align-items-start">
                                <h1>{ this.state.questionView === 'answered' ? "Answered Questions" : "Unanswered Questions"}</h1>
                                <div className="answer-filter">
                                    <button className={ this.state.questionView === 'answered' ? "btn btn-secondary" : "btn btn-secondary disabled"} onClick={() => this.handleViewChange('answered')}>Answered</button>
                                    <button className={ this.state.questionView === 'unanswered' ? "btn btn-secondary" : "btn btn-secondary disabled"} onClick={() => this.handleViewChange('unanswered')}>Unanswered</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageTitle>
                <div className="container">
                    <div className="row">
                        {this.state.questionView === 'answered' &&(
                        this.props.answeredQuestions.map((id, index) => (
                            <Question id={id} key={index} showResults={false} />
                        )))}
                        {this.state.questionView === 'unanswered' &&(
                            this.props.unansweredQuestions.map((id, index) => (
                                <Question id={id} key={index} showResults={false} />
                            )))}
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }) {
    const answeredQuestions = [];
    const unansweredQuestions = [];
    const questionids = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    for(let id of questionids){
        if(users[authedUser].answers[id]){
            answeredQuestions.push(id);
        }else{
            unansweredQuestions.push(id);
        }
    }
    return {
        questionids,
        answeredQuestions,
        unansweredQuestions
    }
}

export default connect(mapStateToProps)(Dashboard);