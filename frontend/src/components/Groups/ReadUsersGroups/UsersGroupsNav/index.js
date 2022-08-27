import React from 'react'
import { NavLink } from "react-router-dom";

import './UserListsNav.css'

function UserListsNav() {

    return (
        <div className='GroupsEventsNav'>
            <div className='listNav'>
                <NavLink to='/your-groups/organized' className='navLink textcolor-bluegreen text25' activeClassName='tab-active'>Organized</NavLink>
            </div>
            <div className='listNav'>
                <NavLink to='/your-groups/member' className='navLink textcolor-bluegreen text25' activeClassName='tab-active'>Member</NavLink>
            </div>
        </div>
    )
}

export default UserListsNav
