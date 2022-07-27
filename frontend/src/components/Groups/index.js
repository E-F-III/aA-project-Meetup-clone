import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './Groups.css';
import { getAllGroups } from '../../store/Groups';
import { NavLink } from 'react-router-dom';

function GroupsList() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state => state.groups)
    const groupsList = Object.values(groups)

    useEffect(() => {
        dispatch(getAllGroups())
    }, [dispatch])

    return (
        <div>{groupsList.map(group => (
            <NavLink key={group.id} to={`/groups/${group.id}`}>
            <div>
                <h3>{group.name}</h3>
                <h4>{group.city}, {group.state}</h4>
                <p>{group.about}</p>
                <p>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</p>
            </div>
            </NavLink>
        ))}</div>
    )
}

export default GroupsList;
