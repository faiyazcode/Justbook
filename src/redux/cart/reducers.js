import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS } from "./actionTypes"

const initialState = {
    data:[],
    loading: false,
    error: null,
    success: false
}


export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return { ...state, loading: true, error: null, success: false }

        case ADD_TO_CART_SUCCESS:
            return { ...state, loading: false, error: null, success: true, data: [...state.data, action.payload] }

        case ADD_TO_CART_FAILURE:
            return { ...state, error: action.payload, loading: false, data: [], sucess: false }

        default:
            return { ...state }
    }
}   