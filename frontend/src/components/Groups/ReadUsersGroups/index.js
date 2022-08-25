import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getUserGroupsThunk } from '../../../store/Groups';

import GroupCard from '../ReadGroupsList/GroupCard';
import './GroupsOfUser.css'

function GroupsOfUser() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state => state.groups)

    const organizedGroups = Object.values(groups).filter(group => sessionUser.id === group.organizerId)
    const joinedGroups = Object.values(groups).filter(group => sessionUser.id !== group.organizerId)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getUserGroupsThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div className='usersList-main'>
            <div>
                <h3>Organizer</h3>
                {organizedGroups.map(group => {
                    return (
                    <GroupCard group={group} key={group.id}/>
                    )
                })}
            </div>
            <div>
                <h3>Member</h3>
                {joinedGroups.map(group => {
                    return (
                        <GroupCard group={group} key={group.id}/>
                    )
                })}
            </div>
        </div>
    )
}

export default GroupsOfUser;
