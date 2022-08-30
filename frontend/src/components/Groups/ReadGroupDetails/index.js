import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch, Route, NavLink, Switch } from 'react-router-dom';

import { getGroupDetailsThunk } from '../../../store/Groups';

import GroupGeneralInfo from './GroupGeneralInfo';
import GroupNavBar from './GroupNavBar';

import EditGroupForm from '../UpdateGroupForm';

import GroupEvents from './GroupEvents';
import EventForm from '../../Events/CreateEventForm';

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
        <div className='main-div backround-light-blue'>
            <div className='flex-row-center w100 border-none-sides'>
                <GroupGeneralInfo group={group} />
            </div>

            <div className='details-navbar-container flex-row-center w100 border-none-sides'>
                <GroupNavBar />
            </div>

            <div className='flex-row-center w100 backround-light-blue h100'>
                <div className='flex-row w70 h100 backround-light-blue'>
                    <div className='w70'>
                        <Switch>
                            <Route path={`${url}/about`}>
                                <div className='h100 backround-light-blue'>
                                    <h2>What we're about</h2>
                                    <p className='spacing'>{group.about}</p>
                                </div>
                            </Route>
                            <Route path={`${url}/events`}>
                                <div className='flex-row'>
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
                                <EditGroupForm group={group} setIsLoaded={setIsLoaded} />
                            </Route>
                            <Route path={`${url}/create-event`}>
                                <EventForm group={group} />
                            </Route>
                        </Switch>

                    </div>
                    <div className='w30'>
                        {/* <div>
                            <h2>Organizer</h2>
                            <div>

                                <p>{group.Organizer.firstName} {group.Organizer.lastName}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupDetails;
