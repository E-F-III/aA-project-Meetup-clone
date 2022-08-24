import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getEventsThunk } from '../../../store/Events';


import './Events.css'

function EventsList() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events)
    const eventsList = Object.values(events)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getEventsThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
        {eventsList.map(event => (
            <EventCard event={event} />
        ))}
        </>
    )
}

export default EventsList;
