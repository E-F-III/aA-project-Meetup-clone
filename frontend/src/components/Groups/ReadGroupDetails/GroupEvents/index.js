import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getGroupEventsThunk } from '../../../../store/Events';

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
            {groupEventsList.map(event => {
                const eventStart = new Date(event.startDate)
                const startArray = eventStart.toString().split(' ')

                const day = startArray[0]
                const date = `${startArray[1]} ${startArray[2]}`
                const hours24 = eventStart.getHours()
                const hours = Number(hours24) > 12 ? Number(hours24) - 12 : hours24
                const minutesDefault = eventStart.getMinutes()
                const minutes = minutesDefault.length === 2 ? minutesDefault : '0'.concat(minutesDefault)
                const AMPM = Number(hours24) > 12 ? 'PM' : 'AM'

                return (
                    <NavLink className="navLink" key={event.id} to={`/events/${event.id}`}>
                        <div className="group-event-card">
                            <div className='group-event-card-header'>
                                <div>
                                    <p className='group-event-time'>{`${day}, ${date} • ${hours}:${minutes} ${AMPM}`}</p>
                                    <h3 className='group-event-name'>{event.name}</h3>
                                </div>
                                <div className="event-card-image">
                                    <img className='cover' src={event.previewImage.length > 0 ? event.previewImage : ""} />
                                </div>
                            </div>
                            <div>
                                <p className='group-event-description'>{event.numAttending} attendees</p>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )

}

export default GroupEvents;
