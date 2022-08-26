import React from 'react';
import { NavLink } from 'react-router-dom';

import './GroupEventCard.css'

function GroupEventCard({ event }) {
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
        <NavLink className="navLink" style={{width: "662px"}} key={event.id} to={`/events/${event.id}`}>
            <div className='group-event-card'>
                <div>
                    <p className='group-event-time'>{`${day}, ${date} • ${hours}:${minutes} ${AMPM}`}</p>
                    <h3 className='group-event-name'>{event.name}</h3>
                    <p className='group-event-description'>{event.numAttending} attendees</p>
                </div>
                <div className="event-card-image">
                    <img className='cover' src={event.previewImage.length > 0 ? event.previewImage : ""} />
                </div>
            </div>
        </NavLink>


    )
}

export default GroupEventCard;
