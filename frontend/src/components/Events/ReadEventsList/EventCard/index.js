import React from 'react';
import { NavLink } from 'react-router-dom';

import './EventCard.css'

function EventCard({ event }) {
    const eventStart = new Date(event.startDate)
    const startArray = eventStart.toString().split(' ')

    const day = startArray[0]
    const date = `${startArray[1]} ${startArray[2]}`
    const hours24 = eventStart.getHours()
    const hours = Number(hours24) > 12 ? Number(hours24) - 12 : hours24
    const minutesDefault = eventStart.getMinutes()
    console.log(minutesDefault)
    const minutes = (minutesDefault > 10) ? minutesDefault : '0'.concat(minutesDefault)
    const AMPM = Number(hours24) > 12 ? 'PM' : 'AM'

    return (
        <NavLink className='navLink card flex-row-center' to={`/events/${event.id}`} key={event.id}>
            <div className='card-left flex-row-center padding20'>
                <div className='card-image-container'>
                    <img
                        className='card-image'
                        src={event.previewImage?.length > 0 ? event.previewImage : ""}
                        hidden={event.previewImage?.length > 0 ? false : true}
                    />
                </div>
            </div>
            <div className='card-right flex-column'>
                <div className='card-title'>
                    <h3 className='card-time uppercase textcolor-gold text14'>{`${day}, ${date} • ${hours}:${minutes} ${AMPM}`}</h3>
                    <h3 className='card-title text16'>{event.name}</h3>
                    <h4 className='card-details text14 textcolor-grey'>{event.Group.name} • {event.Group.city}, {event.Group.state}</h4>
                </div>
                <p className='card-details text14 textcolor-grey'>{event.numAttending} attendees</p>
            </div>
        </NavLink>
    )
}

export default EventCard
