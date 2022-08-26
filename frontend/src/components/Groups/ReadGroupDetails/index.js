import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch, Route, NavLink, Switch } from 'react-router-dom';

import { getGroupDetailsThunk } from '../../../store/Groups';

import GroupEvents from './GroupEvents';
import EditGroupForm from '../UpdateGroupForm';
import EventForm from '../../Events/CreateEventForm';

import GroupNavBar from './GroupNavBar';
import './GroupDetails.css'

function GroupDetails() {
    const { groupId } = useParams()
    const { url } = useRouteMatch()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groups[Number(groupId)])

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div className='main-div'>
            <div>
                <div className='details-general-info-container'>
                    <div className='details-general-info'>
                        <div className='header-img'>
                            <img className='cover'
                                src={group.images.length > 0 ? group.images[0].url : ""}
                                style={{ visibility: `${group.images.length > 0 ? "visible" : "hidden"}` }}
                            />
                        </div>
                        <div>
                            <h1>{group.name}</h1>
                            <ul>
                                <li>{group.city}, {group.state}</li>
                                <li>{group.numMembers} members • {group.private ? 'Private' : 'Public'} group</li>
                                <li>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='details-navbar-container'>
                    {/* <div className='details-navbar'>
                        <div className='groupNav'>
                            <NavLink className="navLink header" activeClassName='tab-active' to={`${url}/about`}>About</NavLink>
                        </div>
                        <div className='groupNav'>
                            <NavLink className="navLink header" activeClassName='tab-active' to={`${url}/events`}>Events</NavLink>
                        </div>
                        <div className='groupNav'>
                            <NavLink className="navLink header" to={`${url}/edit`} style={{ visibility: `${sessionUser && sessionUser.id === group.Organizer.id ? "visible" : "hidden"}` }}>
                                <button className='default'>Edit</button>
                            </NavLink>
                        </div>
                    </div> */}
                    <GroupNavBar />
                </div>
            </div>

            <div className='group-content'>
                <Switch>
                    <Route path={`${url}/about`}>
                            <h2>What we're about</h2>
                            <p className='spacing'>{group.about}</p>
                    </Route>
                    <Route path={`${url}/events`}>
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
                    </Route>
                    <Route path={`${url}/edit`}>
                            <EditGroupForm group={group} />
                    </Route>
                    <Route path={`${url}/create-event`}>
                            <EventForm group={group} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default GroupDetails;
