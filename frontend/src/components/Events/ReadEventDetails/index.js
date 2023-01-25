import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink, useRouteMatch } from 'react-router-dom';

import { getEventDetailsThunk } from '../../../store/Events';
import { getGroupDetailsThunk } from '../../../store/Groups';

import EventGeneralInfo from './EventGeneralnfo';
import EventFooter from './EventFooter';

import './EventDetails.css'
import GroupMiniCard from './GroupMiniCard';
import EventTimeCard from './EventTimeCard';

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
            <div className='event-info-body flex-row-center '>
                <div className='w70 flex-row'>
                    <div className='w70 padding20'>
                        <h3>Details</h3>
                        <p className='spacing text16'>{event.description}</p>
                    </div>
                    <div className='other-info-card w30 padding20'>
                            <GroupMiniCard group={group} />
                            <EventTimeCard date={date} endDate={endDate} venue={event.venue} />
                    </div>
                </div>
            </div>
            <div className='footer flex-row-center border-none-sides'>
                <EventFooter event={event} group={group} setIsLoaded={setIsLoaded}/>
            </div>
        </div>
    );
}

export default EventDetails;
