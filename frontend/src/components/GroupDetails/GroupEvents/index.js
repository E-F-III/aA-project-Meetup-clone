import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEventsOfGroup } from '../../../store/Group-Events';

import './GroupEvents.css'

function GroupEvents({ groupId }) {
    const dispatch = useDispatch()
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
                <NavLink className="navLink" key={event.id} to={`/events/${event.id}`}>
                    <div className="group-event-card">
                        <div className='group-event-card-header'>
                            <div>
                                <p>{event.startDate}</p>
                                <h3>{event.name}</h3>
                            </div>
                            <div className="event-card-image">
                                <img className='cover' src={event.previewImage.length > 0 ? event.previewImage : ""}/>
                            </div>
                        </div>
                        <div>
                            <p>{event.numAttending} attendees</p>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )

}

export default GroupEvents;
