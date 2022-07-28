import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams, Redirect, useHistory, NavLink } from 'react-router-dom';
import { getEventDetails } from '../../store/EventDetails';
import { getGroupDetails } from '../../store/GroupDetails';

function EventDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const event = useSelector(state => state.eventDetails)
    const group = useSelector(state => state.groupDetails)

    const history = useHistory()

    const { eventId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getEventDetails(eventId))
        .then((res) => dispatch(getGroupDetails(res.Group.id)))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            <div>
                <p>{event.startDate}</p>
                <h2>{event.name}</h2>
                {(sessionUser) && sessionUser.id === group.organizerId &&
                    <NavLink to={`/events/${eventId}/edit`}>Edit</NavLink>}
            </div>
            <div>
                <NavLink to={`/groups/${group.id}`}>
                <p>{event.Group.name}</p>
                <p>{event.Group.private ? 'Private' : 'Public'} group</p>
                </NavLink>
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
