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
        <NavLink className="navLink" style={{ width: "70%" }} key={event.id} to={`/events/${event.id}`}>
            <div className='group-event-card flex-row-center'>
                <div className='card-right'>
                    <p className='group-event-time uppercase textcolor-bluegreen text15'>{`${day}, ${date} • ${hours}:${minutes} ${AMPM}`}</p>
                    <h3 className='group-event-name'>{event.name}</h3>
                    <p className='group-event-description textcolor-grey text14'>{event.numAttending} attendees</p>
                </div>
                <div className='card-left'>
                    <div className="event-card-image">
                        <img className='cover' src={event.previewImage.length > 0 ? event.previewImage : ""} hidden= {!event.previewImage.length > 0} />
                    </div>
                </div>
            </div>
        </NavLink>


    )
}

export default GroupEventCard;
