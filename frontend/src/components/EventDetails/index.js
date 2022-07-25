import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { getEventDetails } from '../../store/EventDetails'

function EventDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const event = useSelector(state => state.eventDetails)

    const { eventId } = useParams()

    useEffect(() => {
        dispatch(getEventDetails(eventId))
    }, [dispatch])

    return (
        <div>
            <h1>Hello from Event Details</h1>
            <h2>{event.name}</h2>
            <h3>Details</h3>
            <p>{event.description}</p>
        </div>

    );
}

export default EventDetails
