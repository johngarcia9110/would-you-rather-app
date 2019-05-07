import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionResults extends Component{
    render(){
        const { id, showResults } = this.props;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Question id={id} showResults={showResults}/>
                    </div>
                </div>
            </div>
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