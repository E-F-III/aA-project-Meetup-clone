import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getGroupDetailsThunk } from '../../../../store/Groups';

function GroupNavBar() {
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
        <div className='flex-row-center w70'>
            <div className='flex-row-justify-between flex-row-align-center w70'>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' to={`${url}/about`}>About</NavLink>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' to={`${url}/events`}>Events</NavLink>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' style={{visibility:"hidden"}} to={`${url}/members`}>Members</NavLink>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' style={{visibility:"hidden"}} to={`${url}/photos`}>Photos</NavLink>
            </div>

            <div className='flex-row-align-center w30'>
                <NavLink className="navLink header" to={`${url}/edit`} style={{ visibility: `${sessionUser && sessionUser.id === group.Organizer.id ? "visible" : "hidden"}` }}>
                    <button className='default'>Edit</button>
                </NavLink>
                {/* <button className='default'>Request to join</button> */}
            </div>
        </div>
    )
}

export default GroupNavBar
