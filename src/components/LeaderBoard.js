import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component{
    render(){
        const { usernames, users } = this.props;
        console.log(this.props);
        return(
            <div className="container leaderboard">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="mb-4">Leader Board</h1>
                    </div>
                    {usernames && (
                        usernames.map((username, index) => (
                            <div className="col-12" key={index}>
                                <div className="leaderboard__user">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="leaderboard__user-profile-tag text-center">
                                                <img src={users[username].avatarURL} alt="profile avatar"/>
                                                <h1>{users[username].name}</h1>
                                            </div>
                                        </div>
                                        <div className="col-4 text-center d-flex align-items-center">
                                            <div className="leaderboard__user-info-tag">
                                                <h2>Questions Asked:</h2>
                                                <p>{Object.keys(users[username].questions).length}</p>
                                            </div>
                                        </div>
                                        <div className="col-4 text-center d-flex align-items-center">
                                            <div className="leaderboard__user-info-tag">
                                                <h2>Questions Answered:</h2>
                                                <p>{Object.keys(users[username].answers).length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
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