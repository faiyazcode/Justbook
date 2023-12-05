import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./actionTypes"

const initialState = {
    userDetails: {},
    loading: false,
    error: null,
    token: null,
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return { ...state, loading: true, error: null }

        case LOGIN_SUCCESS:
            return { ...state, loading: false, error: null, token: action.payload.token, userDetails: action.payload.userDetails }

        case LOGIN_FAILURE:
            return { ...state, error: action.payload, loading: false, token : null, userDetails: {} }

        case LOGOUT_SUCCESS:
            return { ...state, token: null, userDetails: {}, error: null, loading: false }

        case LOGOUT_FAILURE:
            return { ...state, error: action.payload }

        default:
            return { ...state }
    }
}   