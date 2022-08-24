import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Events.css'
import { NavLink } from 'react-router-dom';

import FooterInfo from '../../FooterInfo'

function EventsList() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events)
    // let eventsList = Object.values(events)

    const [isLoaded, setIsLoaded] = useState(false)


    return isLoaded && (
        <>
        </>
    )
}

export default EventsList;
