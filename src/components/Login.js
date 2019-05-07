import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state = {
        username : '',
        isLoggedIn : false
    };
    handleSignIn  = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(setAuthedUser(this.state.username));
        this.setState(() => ({ isLoggedIn : true}));
    };
    handleUsernameSelect = (e) => {
        const username = e.target.value;
        this.setState(()=>({username}));
    }
    render(){
        console.log('Login Props: ', this.props);
        const {users, userNames, authedUser} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card login-card">
                            <h1>Which user are you?</h1>
                            <div className="form-group">
                                <select
                                    name="userSelect"
                                    id="userSelect"
                                    className="form-control"
                                    onChange={(e)=>this.handleUsernameSelect(e)}
                                >
                                    <option value="" disabled selected>Select your username</option>
                                    {
                                        userNames && (
                                            userNames.map((name, index) => (
                                                <option value={name} key={index}>{users[name].name}</option>
                                            ))
                                        )
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={(e) => this.handleSignIn(e)}
                                        className={this.state.username !== '' ? "btn btn-secondary" : "btn btn-secondary disabled"}
                                            >Sign In
                                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}){
    return {
        authedUser,
        users,
        userNames : Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login);