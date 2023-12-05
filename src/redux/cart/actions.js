import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS } from "./actionTypes"

export const addToCart = (inputData) =>{
    return async (dispatch)=>{
        try{
            dispatch({type:ADD_TO_CART_REQUEST})
            dispatch({type:ADD_TO_CART_SUCCESS, payload: inputData})
        }catch(err){
            if (err) return dispatch({type: ADD_TO_CART_FAILURE, payload: err.message})
        }
    }
}