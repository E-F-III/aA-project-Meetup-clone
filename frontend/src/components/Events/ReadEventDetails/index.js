import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink, useRouteMatch } from 'react-router-dom';

import { getEventDetailsThunk } from '../../../store/Events';
import { getGroupDetailsThunk } from '../../../store/Groups';

import EventGeneralInfo from './EventGeneralnfo';
import EventFooter from './EventFooter';

import './EventDetails.css'

function EventDetails() {
    const { eventId } = useParams()

    const dispatch = useDispatch()

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
            .then(() => setIsLoaded(true))
    }, [dispatch])



    return isLoaded && (
        <div className='main-div'>
            <div className='flex-row-center border-none-sides'>
                <EventGeneralInfo event={event} />
            </div>
            <div className='event-info-body flex-row-center'>
                <div className='w70 flex-row'>
                    <div className='w70'>
                        <h3>Details</h3>
                        <p>{event.description}</p>
                    </div>

                    <div className='other-info-card w30'>
                        <div className='w70'>
                            <NavLink className='event-group-card navLink' to={`/groups/${group.id}`}>
                                <div className=' w30'>
                                    <div className='event-group-card-image'>
                                        <img
                                            className='event-group-image'
                                            src={group.images.length > 0 ? group.images[0].url : ""}
                                            hidden={group.images.length > 0 ? false : true}
                                        />
                                    </div>
                                </div>

                                <div className='w70'>
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
            </div>
            <div className='event-footer flex-row-center border-none-sides'>
                <EventFooter event={event} group={group} />
            </div>
        </div>

    );
}

export default EventDetails;
