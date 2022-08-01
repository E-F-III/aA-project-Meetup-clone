import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, useHistory, NavLink, useRouteMatch, Switch } from 'react-router-dom';
import { getEventDetails } from '../../store/EventDetails';
import { getGroupDetails } from '../../store/GroupDetails';
import { deleteAnEvent } from '../../store/Events';

import './EventDetails.css'
import EditEventForm from '../EditEventForm';
import FooterInfo from '../FooterInfo'

function EventDetails() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)
    const event = useSelector(state => state.eventDetails)
    const group = useSelector(state => state.groupDetails)

    const { eventId } = useParams()
    const { url } = useRouteMatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const date = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    useEffect(() => {
        dispatch(getEventDetails(eventId))
            .then((res) => dispatch(getGroupDetails(res.Group.id)))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const handleDelete = async e => {
        e.preventDefault()
        const data = await dispatch(deleteAnEvent(event.id))

        history.push(`/groups/${event.groupId}/about`)
    }

    return isLoaded && (
        <>
            <div className='event-title-header'>
                <div>
                    <p>{date.toDateString()}</p>
                    <h2>{event.name}</h2>
                </div>
            </div>
            <div className='event-info-body'>
                <Switch>
                    <Route path={`${url}/about`}>
                        <div>
                            <img className='event-main-image'
                                src={event.images.length > 0 ? event.images[0].url : ""}
                                hidden={event.images.length > 0 ? false : true}
                            />
                            <h3>Details</h3>
                            <p>{event.description}</p>
                        </div>
                    </Route>
                    <Route path={`${url}/edit`}>
                        <EditEventForm />
                    </Route>
                </Switch>
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
                    <p>{event.startDate}</p>
                    <h3>{event.name}</h3>
                </div>
                <div>
                    <div>
                    <button className='default' hidden={(sessionUser) && sessionUser.id === group.organizerId ? false : true} onClick={handleDelete}>Delete</button>
                    </div>
                    <div>
                    <h3>{event.price}</h3>
                    <h3>{Number(event.capacity) - Number(event.numAttending)} spots left</h3>
                    </div>
                </div>
            </div>
            <footer>
                <FooterInfo />
            </footer>
        </>

    );
}

export default EventDetails;
