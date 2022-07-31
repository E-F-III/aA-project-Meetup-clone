import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';
import { getGroupDetails } from '../../store/GroupDetails';
import EditGroupForm from '../EditGroupForm';
import GroupEvents from '../GroupEvents';
import { getEventsOfGroup } from '../../store/Group-Events';


function GroupDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groupDetails)

    const { groupId } = useParams()

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
            <nav>
                <span onClick={() => setCurrTab('about')}>About</span>
                <span onClick={() => setCurrTab('events')}>Events</span>
                {(sessionUser) && sessionUser.id === group.Organizer.id && <span onClick={() => setCurrTab('edit')}>Edit</span>}
            </nav>

            {
                currTab === 'about' &&
                <>
                    <div>
                        <h2>What we're about</h2>
                        <p>{group.about}</p>
                    </div>
                </>
            }
            {
                currTab === 'events' &&
                <div>
                    <h2>Events</h2>
                    <NavLink to={`/groups/${groupId}/events/create-event`}>Add Event</NavLink>
                    <GroupEvents groupId={groupId} />
                </div>
            }
            {
                currTab === 'edit' &&
                <EditGroupForm group={group} updateCurrTab={setCurrTab} />
            }
        </div>
    );
}

export default GroupDetails;
