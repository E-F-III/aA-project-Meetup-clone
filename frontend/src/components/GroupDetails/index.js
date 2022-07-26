import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { getGroupDetails } from '../../store/GroupDetails';

function GroupDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groupDetails)

    const { groupId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroupDetails(groupId)).then(()=> setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            <h1>Hello from Event Details</h1>
            <h2>{group.name}</h2>
        </div>
    );
}

export default GroupDetails;
