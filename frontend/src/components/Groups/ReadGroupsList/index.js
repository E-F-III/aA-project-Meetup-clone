import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getGroupsThunk } from '../../../store/Groups';

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
        <>
            HELLO FROM GROUPS COMPONENT
        </>
    )
}

export default GroupsList;
