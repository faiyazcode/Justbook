import { api } from "../../api"
import { decryptData, encryptData } from "../../utils/encryptAndDecrypt"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./actionTypes"

export const login = (inputData, navigate) =>{
    return async (dispatch)=>{
        dispatch({type: LOGIN_REQUEST})
        try{
            const res = await api.post('/auth/login', { request_data: encryptData(inputData) })

            if (res.status == 200) {
                const decryptRes = decryptData(res.data.response_data)
                if (decryptRes && decryptRes.res_code == 201){
                    return dispatch({type: LOGIN_FAILURE, payload: decryptRes.response})
                }
                const { email, title, first_name, last_name, profile_image, token } = decryptRes.data.profile
                localStorage.setItem("authToken", token)
                localStorage.setItem("userName", first_name)
                dispatch({type: LOGIN_SUCCESS, payload: { token, userDetails:{ email, title, first_name, last_name, profile_image} }})
                return navigate('/search-flight');
            }
        }catch(err){
            if (err) return dispatch({type: LOGIN_FAILURE, payload: err.message})
        }
    }
}


export const logout = (navigate) =>{
    return async (dispatch)=>{
        dispatch({type: LOGOUT_REQUEST})
        try{
            localStorage.clear();
            dispatch({type: LOGOUT_SUCCESS})
            return navigate('/login');

        }catch(err){
            if (err) return dispatch({type: LOGOUT_FAILURE, payload: err.message})
        }
    }
}