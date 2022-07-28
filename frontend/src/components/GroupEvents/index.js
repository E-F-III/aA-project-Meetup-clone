import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './GroupEvents.css'
import { getEventsOfGroup } from '../../store/Group-Events';
import { NavLink } from 'react-router-dom';

function GroupEvents({ groupId }){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const groupEvents = useSelector(state => state.groupEvents)
    const groupEventsList = Object.values(groupEvents)

    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        dispatch(getEventsOfGroup(groupId))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            {groupEventsList.map(event => (
                <NavLink key={event.id} to={`/events/${event.id}`}>
                    <div>
                        <p>{event.startDate}</p>
                        <h3>{event.name}</h3>
                        <p>{event.numAttending} attendees</p>
                    </div>
                </NavLink>
            ))}
        </div>
    )

}

export default GroupEvents;
