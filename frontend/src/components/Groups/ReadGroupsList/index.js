import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGroupsThunk } from '../../../store/Groups';

import GroupCard from './GroupCard';
import './Groups.css';

function GroupsList() {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.groups)
    const groupsList = Object.values(groups)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroupsThunk())
        .then(()=> setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            {groupsList.map(group => (
                <GroupCard group={group} key={group.id}/>
            ))}
        </div>
    )
}

export default GroupsList;
