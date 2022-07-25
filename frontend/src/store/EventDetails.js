import { csrfFetch } from "./csrf";

const GET_EVENT_DETAILS = '/events/event-details'

// actions

const getEvent = (payload) => {
    return {
        type: GET_EVENT_DETAILS,
        payload
    }
}

// thunk

export const getEventDetails = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`)
    const data = await response.json()
    dispatch(getEvent(data))
    return data
}

// reducer

const initialState = {}

const eventDetailsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_EVENT_DETAILS: {
            newState = {...action.payload}
            return newState
        }
        default: {
            return state
        }
    }
}

export default eventDetailsReducer;
