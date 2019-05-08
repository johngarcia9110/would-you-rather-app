import React, { Component, Fragment } from 'react';
import PageTitle from './PageTitle';
import { connect } from 'react-redux';

class LeaderBoard extends Component{
    render(){
        const { usernames, users } = this.props;
        return(
            <Fragment>
                <PageTitle>
                    <div className="col-12 text-center">
                        <h1>Leader Board</h1>
                    </div>
                </PageTitle>
                <div className="container leaderboard">
                    <div className="row">
                        {usernames && (
                            usernames.map((username, index) => (
                                <div className="col-12 leaderboard__user" key={index}>
                                    <div className="row">
                                        <div className="col-4 leaderboard__user-profile-tag">
                                            <div className="text-center">
                                                <img src={users[username].avatarURL} alt="profile avatar"/>
                                                <h1>{users[username].name}</h1>
                                            </div>
                                        </div>
                                        <div className="col-4 text-center d-flex align-items-center">
                                            <div className="leaderboard__user-info-tag">
                                                <h2>Breakdown:</h2>
                                                <p>Questions Asked: {Object.keys(users[username].questions).length}</p>
                                                <p>Questions Answered: {Object.keys(users[username].answers).length}</p>
                                            </div>
                                        </div>
                                        <div className="col-4 text-center d-flex align-items-center">
                                            <div className="leaderboard__user-info-tag leaderboard__user-info-tag--total">
                                                <h2>Total</h2>
                                                <p>{Object.keys(users[username].answers).length + Object.keys(users[username].questions).length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({users}){
    return {
        usernames : Object.keys(users)
            .sort((a,b) => (Object.keys(users[b].answers).length + Object.keys(users[b].questions).length) - (Object.keys(users[a].questions).length + Object.keys(users[a].answers).length)),
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard);