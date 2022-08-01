import { csrfFetch } from './csrf';

const GET_GROUPS = 'groups/get-all-groups'
// const GET_USERS_GROUPS = 'groups/get-users-groups'

const CREATE_GROUP ='groups/create-group'
// const EDIT_GROUP = 'groups/edit-group'
const DELETE_GROUP = 'groups/delete-group'


// GET actions
const getGroups = (payload) => {
    // console.log(payload)
    return {
        type: GET_GROUPS,
        payload
    }
};

// const getUsersGroups = (payload) => {
//     return {
//         type: GET_USERS_GROUPS,
//         payload
//     }
// };


// other actions

const createGroup = (payload) => {
    return {
        type: CREATE_GROUP,
        payload
    }
};

const deleteGroup = (payload) => {
    return {
        type: DELETE_GROUP,
        payload
    }
};

// Thunk action creators

export const getAllGroups = () => async dispatch => {
    const response = await csrfFetch('/api/groups')
    const data = await response.json()
    dispatch(getGroups(data.Groups))
    return data
}

// export const getUserGroups = () => async dispatch => {
//     const response = await csrfFetch('/api/users/currentUser/groups')
//     const data = await response.json()
//     dispatch(getUsersGroups(data))
// }

export const createNewGroup = (payload) => async dispatch => {
    const response = await csrfFetch(
        '/api/groups',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    )
    const data = await response.json()
    await dispatch(createGroup(data))
    await dispatch()
    return data
}

export const deleteAGroup = (groupId) => async dispatch => {
    const response = await csrfFetch(
        `/api/groups/${groupId}`,
        {
            method: 'DELETE'
        }
    )

    const data = await response.json()

    await dispatch(deleteGroup(groupId))
    .then(dispatch(getAllGroups()))
    return data
}

//Reducer

const initialState = {}

const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_GROUPS: {
            newState = { ...state };
            action.payload.forEach(group => {
                newState[group.id] = group
            })
            return newState
        }
        // case GET_USERS_GROUPS: {
        //     newState = {...state}
        //     newState.usersGroups = action.payload
        //     return newState
        // }
        case CREATE_GROUP: {
            newState = { ...state }
            newState[action.payload.id] = action.payload
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
