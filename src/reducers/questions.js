import {ADD_QUESTION, RECEIVE_QUESTIONS} from "../actions/questions";

export default function questions (state = {}, action) {
    switch(action.type){
        case RECEIVE_QUESTIONS :
            console.log("receiving questions");
            return {
                ...state,
                ...action.questions
            };
        case ADD_QUESTION :
            const { question } = action;
            console.log("ADD_QUESTION STATE: ", state);
            return {
                ...state,
                [action.question.id] : question
            }
        default :
            return state;
    }
}