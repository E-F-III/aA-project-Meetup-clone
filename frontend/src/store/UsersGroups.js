import { csrfFetch } from './csrf';

const GET_USERS_GROUPS = 'groups/get-users-groups'

const getUsersGroups = (payload) => {
    return {
        type: GET_USERS_GROUPS,
        payload
    }
};

export const getUserGroups = () => async dispatch => {
    const response = await csrfFetch('/api/users/currentUser/groups')
    const data = await response.json()
    dispatch(getUsersGroups(data))
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
        default: {
            return state
        }
    }
}

export default usersGroupReducer;
