import { csrfFetch } from './csrf';

const GET_USERS_GROUPS = 'groups/get-users-groups'
const CLEAR_USERS_GROUPS = 'groups/user-log-out'

const getUsersGroups = (payload) => {
    return {
        type: GET_USERS_GROUPS,
        payload
    }
};

const clearUsersGroups = () => {
    return {
        type: CLEAR_USERS_GROUPS
    }
}

export const getUserGroups = () => async dispatch => {
    const response = await csrfFetch('/api/users/currentUser/groups')
    const data = await response.json()
    dispatch(getUsersGroups(data))
}

export const clear = () => async dispatch => {
    dispatch(clearUsersGroups())
}

const initialState = {}

const usersGroupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_USERS_GROUPS: {
            newState = {...state}
            newState = {...action.payload}
            return newState
        }
        case CLEAR_USERS_GROUPS: {
            newState = {}
            return newState
        }
        default: {
            return state
        }
    }
}

export default usersGroupReducer;
