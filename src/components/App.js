import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { handleInitialData } from "../actions/shared";
import Login from './Login';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import QuestionResults from "./QuestionResults";


class App extends Component{
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar
                        style={{
                            backgroundColor: '#74BDCB',
                            height:'8px'
                        }}
                    />
                    {this.props.loading === true
                        ? <Fragment>
                            <Navigation/>
                            <Login/>
                        </Fragment>
                        : <div>
                            <Navigation/>
                        <Route path="/" exact component={Dashboard}/>
                        <Route path="/add" component={NewQuestion}/>
                        <Route path="/leaderboard" component={LeaderBoard}/>
                        <Route path="/questions/:id" component={QuestionResults}></Route>
                    </div>
                    }
                </Fragment>
            </Router>

        );
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App);
