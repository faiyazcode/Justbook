import { api } from "../../api"
import { FLIGHT_LIST_FAILURE, FLIGHT_LIST_REQUEST, FLIGHT_LIST_SUCCESS, FROM_AIRPORTS_LIST_FAILURE, FROM_AIRPORTS_LIST_REQUEST, FROM_AIRPORTS_LIST_SUCCESS, TO_AIRPORTS_LIST_FAILURE, TO_AIRPORTS_LIST_REQUEST, TO_AIRPORTS_LIST_SUCCESS } from "./actionTypes"
import { decryptData, encryptData } from "../../utils/encryptAndDecrypt"

export const fetchAirportsData = (input, fieldName) =>{
    return async (dispatch)=>{
        const REQUEST = fieldName === 'from_airport' ? FROM_AIRPORTS_LIST_REQUEST : TO_AIRPORTS_LIST_REQUEST;
        const SUCCESS = fieldName === 'from_airport' ? FROM_AIRPORTS_LIST_SUCCESS : TO_AIRPORTS_LIST_SUCCESS;
        const FAILURE = fieldName === 'from_airport' ? FROM_AIRPORTS_LIST_FAILURE : TO_AIRPORTS_LIST_FAILURE;
        dispatch({type: REQUEST})
        try{
            const res = await api.post('/flight/search-flight-airport', { request_data: encryptData({search_key:input}) })

            if (res.status == 200) {
                const decryptRes = decryptData(res.data.response_data)
                if(decryptRes.data.length >0 ){
                    const responseData  = decryptRes.data.map(airport=>{
                        return {
                            label: airport.airport_name, value:  airport.iata
                        }
                    })
                    dispatch({type: SUCCESS, payload: responseData})
                }
            }
        }catch(err){
            if (err) return dispatch({type: FAILURE, payload: err.message})
        }
    }
}


export const searchFlights = (inputData, navigate) =>{
    return async (dispatch)=>{
        dispatch({type: FLIGHT_LIST_REQUEST})
        try{
            const res = await api.post('/flight/flight-search-list', { request_data: encryptData(inputData)})

            if (res.status == 200) {
                const decryptRes = decryptData(res.data.response_data)
                
                if (decryptRes && decryptRes.res_code == 201){
                    return dispatch({type: FLIGHT_LIST_FAILURE, payload: decryptRes.response})
                }

                dispatch({type: FLIGHT_LIST_SUCCESS, payload: decryptRes.data})
                return navigate('/flight/list');
            }
        }catch(err){
            if (err) return dispatch({type: FLIGHT_LIST_FAILURE, payload: err.message})
        }
    }
}