import { csrfFetch } from "./csrf";
import { getAllEvents } from "./Events";
import { getEventsOfGroup } from "./Group-Events";

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

export const editEventDetails = (eventId, event) => async dispatch => {
    const response = await csrfFetch(
        `/api/events/${eventId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }
    )
    const data = await dispatch(getEventDetails(eventId))
    await dispatch(getAllEvents())
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
