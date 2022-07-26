import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { getGroupDetails } from '../../store/GroupDetails';
import EditGroupForm from '../EditGroupForm';

function GroupDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groupDetails)

    const { groupId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [currTab, setCurrTab] = useState('about')

    useEffect(() => {
        dispatch(getGroupDetails(groupId)).then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            <h1>HELLO FROM GROUP DETAILS COMPONENT</h1>
            <div>

                <h1>{group.name}</h1>
                <ul>
                    <li>{group.city}, {group.state}</li>
                    <li>{group.numMembers} members • {group.private ? 'Private' : 'Public'} group</li>
                    <li>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</li>
                </ul>
            </div>
            <nav>
                <span onClick={()=>setCurrTab('about')}>About</span>
                <span onClick={()=>setCurrTab('events')}>Events</span>
                {sessionUser.id === group.Organizer.id && <span onClick={()=>setCurrTab('edit')}>Edit</span>}
            </nav>

            {
                currTab === 'about' &&
                <div>
                <h2>What we're about</h2>
                <p>{group.about}</p>
            </div>
            }
            {
                currTab === 'events' &&
                <div>
                <h2>Events</h2>
            </div>
            }
            {
                currTab === 'edit' &&
                <EditGroupForm group={group}/>
            }
        </div>
    );
}

export default GroupDetails;
