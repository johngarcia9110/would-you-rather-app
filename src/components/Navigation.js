import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Navigation extends Component{
    handleLogOut = () => {
        const { dispatch } = this.props;
        dispatch(setAuthedUser(null));
    }
    render(){
        const { authedUser, users} = this.props;
        return (
            <div className="container-fluid mainNav">
                <nav className="navbar navbar-expand-lg">
                    <Link to={`/`} className="navbar-brand"><h1 className="logo logo--light">WYR?</h1></Link>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav ml-auto align-items-center">
                            <li className="nav-item"><Link to={`/`} className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to={`/add`} className="nav-link">New Question</Link></li>
                            <li className="nav-item"><Link to='/leaderboard' className="nav-link">LeaderBoard</Link></li>
                            { authedUser && (
                                <li className="nav-item">
                                    <div className="profile">
                                        <img src={users[authedUser].avatarURL} alt="user avatar"/>
                                        <div className="profile__info">
                                            <p>{users[authedUser].name}</p>
                                            <button onClick={()=>this.handleLogOut()}>Logout</button>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}){
    return{
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Navigation);