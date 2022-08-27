import { csrfFetch } from './csrf';

// ACTION TYPES

const GET_GROUPS = "groups/get-all-groups"
const GET_USERS_GROUPS = "groups/get-users-groups"

const CREATE_GROUP = "groups/create-a-group"
const READ_GROUP = "groups/get-details-of-group"
const UPDATE_GROUP = "groups/update-a-group"
const DELETE_GROUP = "groups/delete-a-group"

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

const createGroupAction = (payload) => {
    return {
        type: CREATE_GROUP,
        payload
    }
}

const getGroupDetailsAction = (payload) => {
    return {
        type: READ_GROUP,
        payload
    }
}

const updateGroupAction = (payload) => {
    return {
        type: UPDATE_GROUP,
        payload
    }
}

const deleteGroupAction = (payload) => {
    return {
        type: DELETE_GROUP,
        payload
    }
}

// THUNK ACTION CREATORS

// Read groups

export const getGroupsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/groups')
    const data = await response.json()

    dispatch(getGroupsAction(data))
    return data
}

export const getUserGroupsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/users/currentUser/groups')
    const data = await response.json()

    if (response.ok) {
        dispatch(getUsersGroupsAction(data))
        return data
    } else {
        return data
    }

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
        await dispatch(createGroupAction(data))
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
        await dispatch(updateGroupAction(data))
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
        await dispatch(deleteGroupAction(groupId))
        return data
    } else { // any bad requests and errors
        return data
    }
}

// REDUCER

const initialState = {}

const groupReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_GROUPS: {
            action.payload.Groups.forEach(group => {
                newState[group.id] = group
            })
            return newState
        }
        case GET_USERS_GROUPS: {
            action.payload.Groups.forEach(group => {
                newState[group.id] = group
            })
            return newState
        }
        case CREATE_GROUP: { // although we get redirected, itd be safe to have this for future proofing
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case READ_GROUP: {
            newState = { ...state }
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload } // Gets the new data from the response and adds it to what exists
            return newState
        }
        case UPDATE_GROUP: {
            newState = { ...state }
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload } // Gets the newly edited data, and updates those specific parts
            return newState
        }
        case DELETE_GROUP: {
            newState = { ...state }
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}

export default groupReducer;
