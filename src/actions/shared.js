import { _getQuestions, _getUsers } from "../utils/_DATA";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authedUser";
import  { showLoading, hideLoading } from 'react-redux-loading';

function getInitialData(){
    return Promise.all([_getUsers(), _getQuestions()])
        .then(([users, questions]) => ({users, questions}))
}

export function handleInitialData(user =  null) {
    return (dispatch)=>{
        dispatch(showLoading());
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions));
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(user));
                dispatch(hideLoading());
            })
    }
}