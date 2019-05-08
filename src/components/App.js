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
import QuestionResults from './QuestionResults';
import Footer from './Footer';


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
                    <div className="page-container">
                        <header>
                            <Navigation></Navigation>
                        </header>
                        <main>
                            {this.props.loading === true
                                ? <Login/>
                                : <Fragment>
                                    <Route path="/" exact component={Dashboard}/>
                                    <Route path="/add" component={NewQuestion}/>
                                    <Route path="/leaderboard" component={LeaderBoard}/>
                                    <Route path="/questions/:id" component={QuestionResults}></Route>
                                </Fragment>
                            }
                        </main>
                        <Footer/>
                    </div>
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
