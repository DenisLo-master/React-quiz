import {
    FETCH_GET_QUIZ_ID,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE,
} from "../actions/actionTypes"

const initialState = {
    quizzes: [],
    loading: true,
    error: null,
    results: {}, //{[id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    activeQuizId: null,
    answerState: null, //для текущего состояния Answeritem{[id]: 'success' 'error'}
    quiz: null,
}

export default function quizReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_QUIZZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state, loading: false, quizzes: action.quizzes
            }
        case FETCH_QUIZZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }



        case FETCH_GET_QUIZ_ID:
            return {
                ...state, activeQuizId: action.quizId
            }




        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }

        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            }

        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.questionNumber, answerState: null,
            }

        case QUIZ_RETRY:
            return {
                ...state,
                isFinished: false,
                results: {},
                answerState: null,
                activeQuestion: 0,
            }

        default:
            return state
    }
}