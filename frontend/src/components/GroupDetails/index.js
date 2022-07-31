import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, NavLink, useRouteMatch, Switch } from 'react-router-dom';
import { getGroupDetails } from '../../store/GroupDetails';
import EditGroupForm from '../EditGroupForm';
import GroupEvents from '../GroupEvents';
import { getEventsOfGroup } from '../../store/Group-Events';


function GroupDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groupDetails)

    const { groupId } = useParams()
    const { url } = useRouteMatch()

    const [isLoaded, setIsLoaded] = useState(false)
    const [currTab, setCurrTab] = useState('about')

    useEffect(() => {
        dispatch(getGroupDetails(groupId))
            .then(() => dispatch(getEventsOfGroup(groupId)))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            <div>

                <h1>{group.name}</h1>
                <ul>
                    <li>{group.city}, {group.state}</li>
                    <li>{group.numMembers} members • {group.private ? 'Private' : 'Public'} group</li>
                    <li>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</li>
                </ul>
            </div>

            <div className='groupNavBar'>
                <ul>
                    <li>
                        <NavLink to={`${url}/about`}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${url}/events`}>Events</NavLink>
                    </li>
                    {
                        sessionUser && sessionUser.id === group.Organizer.id &&
                        <li>
                            <NavLink to={`${url}/edit`}>Edit</NavLink>
                        </li>
                    }
                </ul>
            </div>

            <Switch>
                <Route path={`${url}/about`}>
                    <div>
                        <h2>What we're about</h2>
                        <p>{group.about}</p>
                    </div>
                </Route>
                <Route path={`${url}/events`}>
                    <h2>Events</h2>
                    {
                        sessionUser && sessionUser.id === group.Organizer.id &&
                        <NavLink to={`${url}/events/create-event`}>Add Event</NavLink>
                    }
                    <GroupEvents groupId={groupId} />
                </Route>
                <Route path={`${url}/edit`}>
                    <EditGroupForm group={group} updateCurrTab={setCurrTab} />
                </Route>
            </Switch>
        </div>
    );
}

export default GroupDetails;
