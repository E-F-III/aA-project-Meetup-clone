import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGroupEventsThunk } from '../../../../store/Events';

import GroupEventCard from './GroupEventCard';
import './GroupEvents.css'

function GroupEvents({ groupId }) {
    const dispatch = useDispatch()
    const groupEvents = useSelector(state => state.events)
    const groupEventsList = Object.values(groupEvents)

    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        dispatch(getGroupEventsThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            {groupEventsList.map(event => (
                <GroupEventCard event={event} />
            ))}
        </div>
    )

}

export default GroupEvents;
