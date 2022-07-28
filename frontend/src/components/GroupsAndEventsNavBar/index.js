import React from 'react'
import { useHistory, NavLink } from "react-router-dom";
import {  } from 'react-router-dom';

import './GroupsEventNav.css'

function GroupsEventsNav() {
    const history = useHistory()


    return (
        <div className='GroupsEventsNav'>
            <div className='listNav'>
                <NavLink to='/groups' className='navLink header' activeClassName='active'>Groups</NavLink>
            </div>
            <div className='listNav'>
                <NavLink to='/events' className='navLink header' activeClassName='active'>Events</NavLink>
            </div>
        </div>
    )
}

export default GroupsEventsNav
