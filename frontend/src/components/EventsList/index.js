import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './Events.css'
import { getAllEvents } from '../../store/Events'
import { NavLink } from 'react-router-dom';

function EventsList() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const events = useSelector(state => state.events)
    const eventsList = Object.values(events)

    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

    return (
        <div>{eventsList.map(event => (
            <NavLink to={`/events/${event.id}`} key={event.id}>
                <div>
                    <h3>{(event.startDate)}</h3>
                    <h3>{event.name}</h3>
                    <h4>{event.Group.name} • {event.Group.city}, {event.Group.state}</h4>
                    <p>{event.numAttending} attendees</p>
                </div>
            </NavLink>
        ))}</div>

    )
}

export default EventsList;
