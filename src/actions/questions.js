import { _saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
import { showLoading, hideLoading } from  "react-redux-loading";
import {handleInitialData} from "./shared";


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions){
    return {
        type : RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question){
    return {
        type  : ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(question){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return _saveQuestion({
            author : question.author,
            optionOneText : question.optionOneText,
            optionTwoText : question.optionTwoText
        })
            .then(() => dispatch(handleInitialData(authedUser)))
            .then(()=> dispatch(hideLoading()));
    }
}

export function handleSaveQuestionAnswer(answer, authedUser, qid){
    return(dispatch, getState)  => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(() => dispatch(handleInitialData(authedUser)))
            .then(() => dispatch(hideLoading()));
    }
}