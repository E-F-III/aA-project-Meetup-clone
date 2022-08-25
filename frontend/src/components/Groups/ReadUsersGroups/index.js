import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getUserGroupsThunk } from '../../../store/Groups';

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
                        <NavLink className='navLink' key={group.id} to={`/groups/${group.id}/about`}>
                            <div className='group-card'>
                                <div className='card-image'>
                                    <img
                                        className='group-image'
                                        src={group.previewImage.length > 0 ? group.previewImage : ""}
                                        style={{ visibility: `${group.previewImage.length > 0 ? "visible" : "hidden"}` }}
                                    />
                                </div>
                                <div>
                                    <div className='card-title'>
                                        <h3 className='group-card-title'>{group.name}</h3>
                                        <h4 className='group-card-location'>{group.city}, {group.state}</h4>
                                    </div>
                                    <p className='card-about-group'>{group.about}</p>
                                    <p className='card-about-group'>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            <div>
                <h3>Member</h3>
                {joinedGroups.map(group => {
                    return (
                        <NavLink className='navLink' key={group.id} to={`/groups/${group.id}/about`}>
                            <div className='group-card'>
                                <div className='card-image'>
                                    <img
                                        className='group-image'
                                        src={group.previewImage.length > 0 ? group.previewImage : ""}
                                        style={{ visibility: `${group.previewImage.length > 0 ? "visible" : "hidden"}` }}
                                    />
                                </div>
                                <div>
                                    <div className='card-title'>
                                        <h3 className='group-card-title'>{group.name}</h3>
                                        <h4 className='group-card-location'>{group.city}, {group.state}</h4>
                                    </div>
                                    <p className='card-about-group'>{group.about}</p>
                                    <p className='card-about-group'>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default GroupsOfUser;
