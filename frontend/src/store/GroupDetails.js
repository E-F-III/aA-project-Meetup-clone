import { csrfFetch } from "./csrf";

const GET_GROUP_DETAILS = '/groups/group-details'
const EDIT_GROUP_DETAILS = '/groups/edit-group-details'

// actions

const getGroup = (payload) => {
    return {
        type: GET_GROUP_DETAILS,
        payload
    }
}

const editGroup = (payload) => {
    return {
        type: EDIT_GROUP_DETAILS,
        payload
    }
}

// thunk

export const getGroupDetails = (groupId) => async dispatch =>  {
    const response = await csrfFetch(`/api/groups/${groupId}`)
    const data = await response.json()
    dispatch(getGroup(data))
    return data
}

export const editGroupDetails = (groupId, group) => async dispatch => {
    const response = await csrfFetch(
        `/api/groups/${groupId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
    const data = await dispatch(getGroupDetails(groupId))
    return data
}

//reducer

const initialState = {}

const groupDetailsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_GROUP_DETAILS: {
            newState = {...action.payload}
            return newState
        }
        default: {
            return state
        }
    }
}

export default groupDetailsReducer;
