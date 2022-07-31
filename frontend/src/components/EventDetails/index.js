import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams, Redirect, useHistory, NavLink } from 'react-router-dom';
import { getEventDetails } from '../../store/EventDetails';
import { getGroupDetails } from '../../store/GroupDetails';

import './EventDetails.css'
import EditEventForm from '../EditEventForm';

function EventDetails() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)
    const event = useSelector(state => state.eventDetails)
    const group = useSelector(state => state.groupDetails)

    const { eventId } = useParams()

    const [currTab, setCurrTab] = useState('about')
    const [isLoaded, setIsLoaded] = useState(false)

    const date = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    useEffect(() => {
        dispatch(getEventDetails(eventId))
            .then((res) => dispatch(getGroupDetails(res.Group.id)))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            <div className='event-title-header'>
                <p>{date.toDateString()}</p>
                <h2>{event.name}</h2>
                {(sessionUser) && sessionUser.id === group.organizerId &&
                    <div>
                        <h3 onClick={()=> setCurrTab('about')}>About</h3>
                        <h3 onClick={()=> setCurrTab('edit')}>Edit</h3>
                    </div>
                }
            </div>
            <div className='event-info-body'>
                <div className='other-info-card'>
                    <div>
                        <NavLink className='event-group-card navLink' to={`/groups/${group.id}`}>
                            <div className='event-group-card-image'>
                               {
                                   group.images[0] &&
                                   <img className='event-group-image' src={group.images[0].url} />
                               }
                               {
                                    !group.images[0] &&
                                    <img className='event-group-image' src='https://www.hawaii.com/wp-content/uploads/2007/05/33552ff0-b2d2-40e2-8699-50be7d8eeee0-scaled.jpg' />
                               }

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
                {
                    currTab === 'about' &&
                    <div>
                        {
                            event.images[0] &&
                            <img className='event-main-image' src={event.images[0].url}></img>
                        }
                        {
                            !event.images[0] &&
                            <img className='event-main-image' src={'https://www.hawaii-guide.com/images/made/honolulu-waikiki_2500_1667_95_s.jpg'}></img>
                        }
                        <h3>Details</h3>
                        <p>{event.description}</p>
                    </div>
                }
                {
                    currTab === 'edit' &&
                    <EditEventForm event={event} updateCurrTab={setCurrTab}/>
                }
            </div>
            <div className='event-footer'>
                <div>
                    <p>{event.startDate}</p>
                    <h3>{event.name}</h3>
                </div>
                <div>
                    <h3>{event.price}</h3>
                    <h3>{Number(event.capacity) - Number(event.numAttending)} spots left</h3>
                </div>
            </div>
        </>

    );
}

export default EventDetails;
