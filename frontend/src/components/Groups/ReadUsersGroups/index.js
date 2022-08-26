import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';

import { getUserGroupsThunk } from '../../../store/Groups';

import GroupCard from '../ReadGroupsList/GroupCard';
import './GroupsOfUser.css'
import UserListsNav from './UsersGroupsNav';

function GroupsOfUser() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state => state.groups)

    const organizedGroups = Object.values(groups).filter(group => sessionUser.id === group.organizerId)
    const joinedGroups = Object.values(groups).filter(group => sessionUser.id !== group.organizerId)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getUserGroupsThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div className='main-div flex-column-center flex-column'>
            <div style={{ margin: "10px 0px 5px 0px" }}>
                <UserListsNav />
            </div>
            <div>
                <Switch>
                    <Route exact path='/your-groups/organized'>
                        {organizedGroups.map(group => (
                            <GroupCard group={group} key={group.id} />
                        ))}
                    </Route>
                    <Route exact path='/your-groups/member'>
                        {joinedGroups.map(group => (
                            <GroupCard group={group} key={group.id} />
                        ))}
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default GroupsOfUser;
