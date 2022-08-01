import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Events.css'
import { getAllEvents } from '../../store/Events'
import { NavLink } from 'react-router-dom';

import GroupsEventsNav from '../GroupsAndEventsNavBar';
import FooterInfo from '../FooterInfo'

function EventsList() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events)
    let eventsList = Object.values(events)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllEvents())
            .then((res) => eventsList = Object.values(res))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            <div className='listbody-container'>
                <div className='listbody'>
                    <GroupsEventsNav />
                    <div className='eventList'>
                        {
                            eventsList.map(event => {

                                const eventStart = new Date(event.startDate)
                                const startArray = eventStart.toString().split(' ')

                                // const timezone = eventStart.toTimeString().split(' ')[3]

                                const day = startArray[0]
                                const date = `${startArray[1]} ${startArray[2]}`
                                const hours24 = eventStart.getHours()
                                const hours = Number(hours24) > 12 ? Number(hours24) - 12 : hours24
                                const minutesDefault = eventStart.getMinutes()
                                const minutes = minutesDefault.length === 2 ? minutesDefault : '0'.concat(minutesDefault)
                                const AMPM = Number(hours24) > 12 ? 'PM' : 'AM'

                                return (
                                    <NavLink className='navLink' to={`/events/${event.id}`} key={event.id}>
                                        <div className='event-card'>
                                            <div className='card-image'>
                                                <img
                                                    className='event-image'
                                                    src={event.previewImage?.length > 0 ? event.previewImage : ""}
                                                    hidden={event.previewImage?.length > 0 ? false : true}
                                                />
                                            </div>
                                            <div>
                                                <div className='card-title'>
                                                    <h3>{`${day}, ${date} • ${hours}:${minutes} ${AMPM}`}</h3>
                                                    <h3>{event.name}</h3>
                                                    <h4>{event.Group.name} • {event.Group.city}, {event.Group.state}</h4>
                                                </div>
                                                <p>{event.numAttending} attendees</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <footer>
                <FooterInfo />
            </footer>
        </>
    )
}

export default EventsList;
