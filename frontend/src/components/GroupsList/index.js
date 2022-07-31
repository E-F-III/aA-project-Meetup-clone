import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './Groups.css';
import { getAllGroups } from '../../store/Groups';
import { NavLink } from 'react-router-dom';

import GroupsEventsNav from '../GroupsAndEventsNavBar';

function GroupsList() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state => state.groups)
    const groupsList = Object.values(groups)

    useEffect(() => {
        dispatch(getAllGroups())
    }, [dispatch])

    return (
        <div className='listbody-container'>
            <div className='listbody'>
                <GroupsEventsNav />
                <div className='groupList'>
                    {groupsList.map(group => (
                        <NavLink className='navLink' key={group.id} to={`/groups/${group.id}/about`}>
                            <div className='group-card'>
                                <div className='card-image'>
                                    <img
                                        className='group-image'
                                        src={group.previewImage.length > 0 ? group.previewImage : ""}
                                        style={{visibility: `${group.previewImage.length > 0? "visible" : "hidden"}`}}
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
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GroupsList;
