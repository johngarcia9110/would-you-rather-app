import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {this.props.questionids.map((id, index) => (
                            <Question id={id} key={index} showResults={false} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ questions }) {
    return {
        questionids: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);