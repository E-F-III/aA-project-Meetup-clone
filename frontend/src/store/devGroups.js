import { csrfFetch } from './csrf';

// ACTION TYPES

const GET_GROUPS = "groups/get-all-groups"
const GET_USERS_GROUPS = "groups/get-users-groups"
const GET_GROUP_DETAILS = "groups/get-details-of-group"

const GET_GROUP_EVENTS = "groups/get-events-of-group"

// ACTION CREATORS

const getGroupsAction = (payload) => {
    return {
        type: GET_GROUPS,
        payload
    }
}

const getUsersGroupsAction = (payload) => {
    return {
        type: GET_USERS_GROUPS,
        payload
    }
}

const getGroupDetailsAction = (payload) => {
    return {
        type: GET_GROUP_DETAILS,
        payload
    }
}

const getGroupEventsAction = (payload) => {
    return {
        type: GET_GROUP_EVENTS,
        payload
    }
}

// THUNK ACTION CREATORS

// Read groups

export const getGroupsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/groups')
    const data = await response.json()

    dispatch(getGroupsAction(data.Groups))
    return data
}

export const getUserGroupsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/users/currentUser/groups')
    const data = await response.json()

    dispatch(getUsersGroupsAction(data))
    return data
}

// Group CRUD

// Create
export const createNewGroupThunk = (payload) => async dispatch => {
    const response = await csrfFetch('/api/groups',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

    const data = await response.json()

    if (response.ok) {
        await dispatch(getGroupsAction())
        return data
    } else { // any bad requests and errors
        return data
    }

}

// Read
export const getGroupDetailsThunk = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`)
    const data = await response.json()

    if (response.ok) {
        dispatch(getGroupDetailsAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }
}

// Update
export const editGroupDetailsThunk = (groupId, group) => async dispatch => {
    const response = await csrfFetch(
        `/api/groups/${groupId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
    const data = await response.json()

    if (response.ok) {
        await dispatch(getGroupsAction())
        return data
    } else { // any bad requests and errors
        return data
    }

}

// Delete
export const deleteGroupThunk = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`,
        {
            method: 'DELETE'
        })
    const data = await response.json()

    if (response.ok) {
        await dispatch(getGroupsAction())
        return data
    } else { // any bad requests and errors
        return data
    }
}

// Bonus Features related to Groups

// Read Events of a Group
export const getEventsOfGroup = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`)
    const data = await response.json()

    if (response.ok) {
        dispatch(getGroupEventsAction(data))
        return data
    } else {
        return data
    }
}

// Feature #3 Members of Group

// REDUCER

const initialState = {
    groupsList: {},
    groupDetails: {},
    userGroups: {}
}

const groupReducerDEV = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_GROUPS: {
            let groupsList = {} // create an empty object to overwrite part of the newState
            action.payload.forEach(group => { // if not, could cause issues with deleting
                groupsList[group.id] = group
            })
            newState.groupsList = groupsList
            return newState
        }
        case GET_USERS_GROUPS: {
            newState.userGroups = action.payload
            return newState
        }
        case GET_GROUP_DETAILS: {
            newState.groupDetails = action.payload
            return newState
        }
        case GET_GROUP_EVENTS: {
            newState.groupDetails.events = {} // add an event object to the groupDetails to allow normalization of the events of said group
            action.payload.forEach(event => {
                newState.groupDetails.events[event.id] = event
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default groupReducerDEV;
