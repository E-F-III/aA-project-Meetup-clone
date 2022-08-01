import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getUserGroups } from '../../store/UsersGroups';

import './GroupsOfUser.css'

function GroupsOfUser() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state => state.usersGroups)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getUserGroups())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            <h1>Your Groups</h1>
            <div>
                <h3>Groups you've organized</h3>
                {groups.organized.map(group => {
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
                                        <h3>{group.name}</h3>
                                        <h4>{group.city}, {group.state}</h4>
                                    </div>
                                    <p className='about-group'>{group.about}</p>
                                    <p>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            <div>
                <h3>Groups you're a member of</h3>
                {groups.memberOf.map(group => {
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
                                        <h3>{group.name}</h3>
                                        <h4>{group.city}, {group.state}</h4>
                                    </div>
                                    <p className='about-group'>{group.about}</p>
                                    <p>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</p>
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
