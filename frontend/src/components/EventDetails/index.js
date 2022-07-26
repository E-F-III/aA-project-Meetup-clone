import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { getEventDetails } from '../../store/EventDetails'

function EventDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const event = useSelector(state => state.eventDetails)

    const { eventId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getEventDetails(eventId)).then(() => setIsLoaded(true))
    }, [dispatch])

    return (isLoaded &&
        <>
            <div>
                <p>{event.startDate}</p>
                <h2>{event.name}</h2>
            </div>
            <div>
                <p>{event.Group.name}</p>
                <p>{event.Group.private ? 'Private' : 'Public'} group</p>
            </div>
            <div>
                <div>
                    <p>{event.startDate} to</p>
                    <p>{event.endDate}</p>
                </div>
                <div>
                    <p>{event.venue}</p>
                </div>
            </div>
            <div>
                <h3>Details</h3>
                <p>{event.description}</p>
            </div>
            <div>
                <div>
                    <p>{event.startDate}</p>
                    <h3>{event.name}</h3>
                </div>
                <div>
                    <h3>{event.price}</h3>
                    <h3>{Number(event.capacity) - Number(event.numAttending)} spots left</h3>
                </div>
            </div>
        </>

    );
}

export default EventDetails;
