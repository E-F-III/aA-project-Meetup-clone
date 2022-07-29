import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import './Events.css'
import { getAllEvents } from '../../store/Events'
import { NavLink } from 'react-router-dom';

import GroupsEventsNav from '../GroupsAndEventsNavBar';

function EventsList() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const events = useSelector(state => state.events)
    const eventsList = Object.values(events)

    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

    return (
        <div className='listbody-container'>
            <div className='listbody'>
                <GroupsEventsNav />
                <div className='eventList'>
                    {eventsList.map(event => {

                        const eventStart = new Date (event.startDate)
                        const startString = eventStart.toString()

                        return (
                            <NavLink className='navLink' to={`/events/${event.id}`} key={event.id}>
                                <div className='event-card'>
                                    <div className='card-image'>
                                        <img className='event-image' src={event.previewImage} />
                                    </div>
                                    <div>
                                        <div className='card-title'>
                                            <h3>{startString}</h3>
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

    )
}

export default EventsList;
