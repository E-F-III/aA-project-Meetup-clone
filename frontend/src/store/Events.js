import { csrfFetch } from "./csrf";

// ACTION TYPES

const GET_EVENTS = "events/get-all-events"
const GET_GROUPS_EVENTS = "events/get-events-of-a-group"

const CREATE_EVENT = "events/create-a-event"
const READ_EVENT = "events/get-details-of-events"
// const UPDATE_EVENT = "events/update-a-event"
const DELETE_EVENT = "events/delete-a-event"


// ACTION CREATORS

const getEventsAction = (payload) => {
    return {
        type: GET_EVENTS,
        payload
    }
}

const createEventAction = (payload) => {
    return {
        type: CREATE_EVENT,
        payload
    }
}

const getEventDetailsAction = (payload) => {
    return {
        type: READ_EVENT,
        payload
    }
}

// const updateEventAction = (payload) => {
//     return {
//         type: UPDATE_EVENT,
//         payload
//     }
// }

const deleteEventAction = (payload) => {
    return {
        type: DELETE_EVENT,
        payload
    }
}

// THUNK ACTION CREATORS

// Read Events

export const getEventsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/events')
    const data = await response.json()

    await dispatch(getEventsAction(data))
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
        await dispatch(createEventAction(data))
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
        await dispatch(deleteEventAction(eventId))
        return data
    } else { // any bad requests and errors
        return data
    }
}

// Bonuse features related to Events

// Feature #4 Attendees of Event

// REDUCER

const initialState = {}

const eventsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_EVENTS: {
            action.payload.Events.forEach(event => { // if not, could cause issues with deleting
                newState[event.id] = event
            })
            return newState
        }
        case CREATE_EVENT:{

        }
        case READ_EVENT: {
            newState.eventDetails = action.payload
            return newState
        }
        // case UPDATE_EVENT: {

        // }
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

export default eventsReducer
