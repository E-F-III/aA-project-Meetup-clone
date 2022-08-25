import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, useHistory, NavLink, useRouteMatch, Switch } from 'react-router-dom';

import { getEventDetailsThunk, deleteEventThunk } from '../../../store/Events';
import { getGroupDetailsThunk } from '../../../store/Groups';

import './EventDetails.css'

function EventDetails() {
    const { eventId } = useParams()
    const { url } = useRouteMatch()

    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)
    const events = useSelector(state => state.events)
    const groups = useSelector(state => state.groups)

    const event = events[Number(eventId)]
    const group = groups[Number(event?.groupId)]

    const [isLoaded, setIsLoaded] = useState(false)

    const date = new Date(event?.startDate)
    const endDate = new Date(event?.endDate)

    useEffect(() => {
       dispatch(getEventDetailsThunk(eventId))
       .then(data => dispatch(getGroupDetailsThunk(data.groupId)))
       .then(()=>setIsLoaded(true))
    }, [dispatch])

    const handleDelete = async e => {
        e.preventDefault()
        const data = dispatch(deleteEventThunk(event.id))

        history.push(`/groups/${group.id}`)
    }

    return isLoaded && (
        <div>
            <div className='event-title-header'>
                <div>
                    <p>{date.toDateString()}</p>
                    <h2>{event.name}</h2>
                </div>
            </div>
            <div className='event-info-body'>
                <div style={{width: "660px"}}>
                    <img className='event-main-image'
                        src={event.images.length > 0 ? event.images[0].url : ""}
                        hidden={event.images.length > 0 ? false : true}
                    />
                    <h3>Details</h3>
                    <p>{event.description}</p>
                </div>
                <div className='other-info-card'>
                    <div>
                        <NavLink className='event-group-card navLink' to={`/groups/${group.id}`}>
                            <div className='event-group-card-image'>
                                <img
                                    className='event-group-image'
                                    src={group.images.length > 0 ? group.images[0].url : ""}
                                    hidden={group.images.length > 0 ? false : true}
                                />
                            </div>
                            <div>
                                <p>{event.Group.name}</p>
                                <p>{event.Group.private ? 'Private' : 'Public'} group</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className='event-time-info'>
                        <div>
                            <p>{date.toString()} to</p>
                            <p>{endDate.toString()}</p>
                        </div>
                        <div>
                            <p>{event.venue}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='event-footer'>
                <div>
                    <p>{date.toDateString()}</p>
                    <h3>{event.name}</h3>
                </div>
                <div>
                    <div>
                        <button className='default' hidden={(sessionUser) && sessionUser.id === group.organizerId ? false : true} onClick={handleDelete}>Delete</button>
                    </div>
                    <div>
                        <h3>Price: ${event.price}</h3>
                        <h3>{Number(event.capacity) - Number(event.numAttending)} spots left</h3>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EventDetails;
