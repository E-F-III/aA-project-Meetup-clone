import { AuthenticationMD5Password } from "pg-protocol/dist/messages";
import { csrfFetch } from "./csrf";

const GET_GROUP_EVENTS = '/groups/get-events'

// actions

const getGroupEvents = (payload) => {
    return {
        type: GET_GROUP_EVENTS,
        payload
    }
}

//thunk

export const getEventsOfGroup = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`)
    const data = await response.json()
    dispatch(getGroupEvents(data))
    return data
}

//reducer

const initialState = {}

const groupEventsReducer = (state = initialState, aciton) => {
    let newState;
    switch(aciton.type){
        case GET_GROUP_EVENTS: {
            newState = {...state}
            aciton.payload.Events.forEach(event => {
                newState[event.id] = event
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default groupEventsReducer;
