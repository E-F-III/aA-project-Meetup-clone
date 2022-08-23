import { csrfFetch } from "./csrf";

// ACTION TYPES

const GET_EVENTS = "events/get-all-events"
const GET_EVENT_DETAILS = "events/get-details-of-events"

// ACTION CREATORS

const getEventsAction = (payload) => {
    return {
        type: GET_EVENTS,
        payload
    }
}

const getEventDetailsAction = (payload) => {
    return {
        type: GET_EVENT_DETAILS,
        payload
    }
}

// THUNK ACTION CREATORS

// Read Events

export const getEventsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/events')
    const data = await response.json()

    await dispatch(getEventsAction(data.Events))
    return data
}

// Event CRUD

// Create
export const createEventThunk = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${payload.groupId}/events`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload.newEvent)
        }
    )
    const data = await response.json()

    if (response.ok) {
        await dispatch(getEventDetailsAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }

}

// Read
export const getEventDetailsThunk = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`)
    const data = await response.json()

    if (response.ok) {
        await dispatch(getEventDetailsAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }
}

// Update

// Delete
export const deleteEventThunk = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`,
        {
            method: 'DELETE'
        }
    )
    const data = await response.json()

    if (response.ok) {
        await dispatch(getEventsAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }
}

// Bonuse features related to Events

// Feature #4 Attendees of Event

// REDUCER

const initialState = {
    eventsList: {},
    eventDetails: {}
}

const eventsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_EVENTS: {
            let eventsList = {} // create an empty object to overwrite part of the newState
            action.payload.forEach(event => { // if not, could cause issues with deleting
                eventsList[event.id] = event
            })
            newState.eventsList = eventsList
            return newState
        }
        case GET_EVENT_DETAILS: {
            newState.eventDetails = action.payload
            return newState
        }
        default: {
            return state
        }
    }
}

export default eventsReducer
