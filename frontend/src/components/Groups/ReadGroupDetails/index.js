import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getGroupDetailsThunk } from '../../../store/Groups';

import './GroupDetails.css'

function GroupDetails() {
    const { groupId } = useParams()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groups[Number(groupId)])

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId))
            // .then(() => dispatch(getEventsOfGroup(groupId)))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            <h1>Hello from Group Details</h1>
            <div>{group.name}</div>
        </>
    );
}

export default GroupDetails;
