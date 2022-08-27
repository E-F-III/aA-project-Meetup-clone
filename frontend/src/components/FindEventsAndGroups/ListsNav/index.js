import React from 'react'
import { NavLink } from "react-router-dom";

import './ListsNav.css'

function ListsNav() {

    return (
        <div className='GroupsEventsNav'>
            <div className='listNav'>
                <NavLink to='/find/events' className='navLink textcolor-bluegreen text25' activeClassName='tab-active'>Events</NavLink>
            </div>
            <div className='listNav'>
                <NavLink to='/find/groups' className='navLink textcolor-bluegreen text25' activeClassName='tab-active'>Groups</NavLink>
            </div>
        </div>
    )
}

export default ListsNav
