import { csrfFetch } from './csrf';

const GET_EVENTS = 'events/get-all-events'

// actions

const getEvents = (payload) => {
    return {
        type: GET_EVENTS,
        payload
    }
}

// thunk

export const getAllEvents = () => async dispatch => {
    const response = await csrfFetch('/api/events')
    const data = await response.json()
    dispatch(getEvents(data.Events))
    return data
}

// reducer

const initialState = {}

const eventReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_EVENTS: {
            newState = { ...state };
            action.payload.forEach(event => {
                newState[event.id] = event
            });
            return newState
        }
        default: {
            return state
        }
    }
}

export default eventReducer;
