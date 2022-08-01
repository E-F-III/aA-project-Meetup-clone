import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, NavLink, useRouteMatch, Switch } from 'react-router-dom';

import { getGroupDetails } from '../../store/GroupDetails';
import { getEventsOfGroup } from '../../store/Group-Events';

import EventForm from '../CreateEventForm';
import EditGroupForm from './EditGroupForm';
import GroupEvents from './GroupEvents';

import FooterInfo from '../FooterInfo'
import './GroupDetails.css'

function GroupDetails() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groupDetails)

    const { groupId } = useParams()
    const { url } = useRouteMatch()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroupDetails(groupId))
            .then(() => dispatch(getEventsOfGroup(groupId)))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <>
            <div className='group-main'>
                <div className='group-header-div'>
                    <div className='group-header'>
                        <div className='header-img'>
                            <img className='cover'
                                src={group.images.length > 0 ? group.images[0].url : ""}
                                style={{ visibility: `${group.images.length > 0 ? "visible" : "hidden"}` }}
                            />
                        </div>
                        <div className='group-header-details'>
                            <h1>{group.name}</h1>
                            <ul className='group-header-list'>
                                <li>{group.city}, {group.state}</li>
                                <li>{group.numMembers} members • {group.private ? 'Private' : 'Public'} group</li>
                                <li>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='groupNavBar'>
                    <div className='groupNavDiv'>

                        <div className='groupNav'>
                            <NavLink
                                className="navLink header"
                                activeClassName='tab-active'
                                to={`${url}/about`}
                            >
                                About
                            </NavLink>
                        </div>
                        <div className='groupNav'>
                            <NavLink
                                className="navLink header"
                                activeClassName='tab-active'
                                to={`${url}/events`}
                            >
                                Events
                            </NavLink>
                        </div>
                        <div className='groupNav'>
                            <NavLink
                                className="navLink header"
                                to={`${url}/edit`}
                                style={{ visibility: `${sessionUser && sessionUser.id === group.Organizer.id ? "visible" : "hidden"}` }}
                            >
                                <button className='default'>Edit</button>
                            </NavLink>
                        </div>
                    </div>


                </div>
                <div className='group-body'>
                    <Switch>
                        <Route path={`${url}/about`}>
                            <div className='group-content'>
                                <h2>What we're about</h2>
                                <p className='spacing'>{group.about}</p>
                            </div>
                        </Route>
                        <Route path={`${url}/events`}>
                            <div className='group-content'>
                                <div className='group-events-header'>
                                    <h2>Events</h2>
                                    <NavLink
                                        to={`${url}/create-event`}
                                        style={{ visibility: `${sessionUser && sessionUser.id === group.Organizer.id ? "visible" : "hidden"}` }}
                                    >
                                        <button className='default'>Add Event</button>
                                    </NavLink>
                                </div>

                                <GroupEvents groupId={groupId} />
                            </div>
                        </Route>
                        <Route path={`${url}/edit`}>
                            <div className='group-content'>
                                <EditGroupForm group={group} />
                            </div>
                        </Route>
                        <Route path={`${url}/create-event`}>
                            <div className='group-content'>
                                <EventForm group={group} />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
            <footer>
                <FooterInfo />
            </footer>
        </>
    );
}

export default GroupDetails;
