import { FLIGHT_LIST_FAILURE, FLIGHT_LIST_REQUEST, FLIGHT_LIST_SUCCESS, FROM_AIRPORTS_LIST_FAILURE, FROM_AIRPORTS_LIST_REQUEST, FROM_AIRPORTS_LIST_SUCCESS, TO_AIRPORTS_LIST_FAILURE, TO_AIRPORTS_LIST_REQUEST, TO_AIRPORTS_LIST_SUCCESS } from "./actionTypes"

const initialState = {
    fromAirportList: {
        data: [],
        loading: false,
        error: null
    },
    toAirportList: {
        data: [],
        loading: false,
        error: null
    },
    flightsList: {
        data: [],
        loading: false,
        error: null
    }
}


export const airportListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FROM_AIRPORTS_LIST_REQUEST:
            return { ...state, fromAirportList: { ...state.fromAirportList, loading: true } }

        case FROM_AIRPORTS_LIST_SUCCESS:
            return { ...state, fromAirportList: { ...state.fromAirportList, data: action.payload, loading: false, error: null } }

        case FROM_AIRPORTS_LIST_FAILURE:
            return { ...state, fromAirportList: { ...state.fromAirportList, data: [], loading: false, error: action.payload } }

        case TO_AIRPORTS_LIST_REQUEST:
            return { ...state, toAirportList: { ...state.toAirportList, loading: true } }

        case TO_AIRPORTS_LIST_SUCCESS:
            return { ...state, toAirportList: { ...state.toAirportList, data: action.payload, loading: false } }

        case TO_AIRPORTS_LIST_FAILURE:
            return { ...state, toAirportList: { ...state.toAirportList, data: [], loading: false, error: action.payload } }

        case FLIGHT_LIST_REQUEST:
            return { ...state, flightsList: { ...state.flightsList, loading: true } }

        case FLIGHT_LIST_SUCCESS:
            return { ...state, flightsList: { ...state.flightsList, data: action.payload, loading: false, error: null } }

        case FLIGHT_LIST_FAILURE:
            return { ...state, flightsList: { ...state.flightsList, data: [], loading: false, error: action.payload } }

        default:
            return { ...state }
    }
}   