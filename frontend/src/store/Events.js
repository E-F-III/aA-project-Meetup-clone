import { csrfFetch } from './csrf';

const GET_EVENTS = 'events/get-all-events'

const CREATE_EVENT = 'events/create-event'
const EDIT_EVENT = 'events/edit-event'
const DELETE_EVENT = 'events/delete-event'


// actions

const getEvents = (payload) => {
    return {
        type: GET_EVENTS,
        payload
    }
}

const createEvent = (payload) => {
    return {
        type: CREATE_EVENT,
        payload
    }
}
const editEvent = (payload) => {
    return {
        type: EDIT_EVENT,
        payload
    }
}
const deleteEvent = (payload) => {
    return {
        type: DELETE_EVENT,
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

export const createNewEvent = (payload) => async dispatch => {
    const response = await csrfFetch(
        `/groups/${payload.groupId}/events`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload.body)
        }
    )

    const data = await response.json()
    await dispatch(createEvent(data))
    return data
}

export const deleteAnEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(
        `/api/events/${eventId}`,
        {
            method: 'DELETE'
        }
    )

    const data = await response.json()

    await dispatch(deleteEvent(eventId))
    return data
}

// reducer

const initialState = {}

const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENTS: {
            newState = { ...state };
            action.payload.forEach(event => {
                newState[event.id] = event
            });
            return newState
        }
        case DELETE_EVENT: {
            newState = { ...state }
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}

export default eventReducer;
