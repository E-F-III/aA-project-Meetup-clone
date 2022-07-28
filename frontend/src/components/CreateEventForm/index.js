import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getGroupDetails } from "../../store/GroupDetails";

import './CreateEventForm.css'

function EventForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { groupId } = useParams()

    const group = useSelector(state => state.groupDetails)

    const [isLoaded, setIsLoaded] = useState(false)

    const [venueId, setVenueId] = useState()
    const [name, setName] = useState()
    const [type, setType] = useState('In person')
    const [capacity, setCapacity] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    useEffect(() => {
        dispatch(getGroupDetails(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault()
    }

    return isLoaded && (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Hello from create event form</h1>
                <div className="event-form-div">

                    <label for="event-name">Event Name</label>
                    <input
                    name="event-name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                </div>
                <div className="event-form-div">

                    <label for="event-about">About this event</label>
                    <textarea
                        rows='13'
                        cols='76'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        placeholder='Please write at least 50 characters'
                        name='event-about' />
                </div>
                <div className="event-form-div">
                    <label for='event-type'>Will this event be in person or offline?</label>
                    <select name='event-type'>
                        <option value='In person' onChange={e => setType(e.target.value)}>In Person</option>
                        <option value='Online' onChange={e => setType(e.target.value)}>Online</option>
                    </select>
                </div>
                <div className="event-form-div">
                    <label for='event-capacity'>How many people are allowed to attend this event?</label>
                    <input
                    name="event-capacity"
                    type="number"
                    min="1" />
                </div>
                <div className="event-form-div">
                    <label for="event-price">How much will it cost to attend this event?</label>
                    <input
                    name="event-price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    data-type="currency" />
                </div>
                <div className="event-form-div">
                    <p>When will the event take place?</p>
                    <div>
                        <label for="event-start-date">Start Date</label>
                        <input
                        name="event-start-date"
                        type="datetime-local"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label for="event-end-date">End Date</label>
                        <input
                        name="event-end-date"
                        type="datetime-local"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EventForm;
