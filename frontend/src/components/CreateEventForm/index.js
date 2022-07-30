import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getGroupDetails } from "../../store/GroupDetails";
import { createNewEvent } from "../../store/Events";

import './CreateEventForm.css'

function EventForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { groupId } = useParams()

    const group = useSelector(state => state.groupDetails)


    const [venueId, setVenueId] = useState()
    const [name, setName] = useState('')
    const [type, setType] = useState('In Person')
    const [capacity, setCapacity] = useState(1)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [isLoaded, setIsLoaded] = useState(false)
    const [validationErrors, setvalidationErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        dispatch(getGroupDetails(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        const errors = []

        if (name.length < 5) errors.push('Name must have at least 5 characters')
        if (new Date(startDate) <= new Date()) errors.push('Start date must be in the future')
        if (new Date(endDate) < new Date( startDate)) errors.push('End date must be after the start date')

        setvalidationErrors(errors)

    }, [name, startDate, endDate])

    const handleSubmit = async e => {
        e.preventDefault()

        setIsSubmitted(true)

        if (validationErrors.length > 0) return

        const newEvent = {
            venueId, name, type, capacity, price, description, startDate, endDate
        }

        const payload = { groupId, newEvent }

        const data = await dispatch(createNewEvent(payload))

        history.push(`/events/${data.id}`)
    }

    return isLoaded && (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create an event!</h1>
                {isSubmitted && validationErrors.length > 0 &&
                    <ul>
                        {validationErrors.map(error => <li>{error}</li>)}
                    </ul>}
                <div className="event-form-div">
                    <label htmlFor="event-name">Event Name</label>
                    <input
                        required
                        name="event-name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className="event-form-div">
                    <label htmlfor="event-about">About this event</label>
                    <textarea
                        required
                        rows='13'
                        cols='76'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        placeholder='Please write at least 50 characters'
                        name='event-about' />
                </div>
                <div className="event-form-div">
                    <label htmlfor='event-type'>Will this event be in person or online?</label>
                    <select required name='event-type'>
                        <option value='In Person' onChange={e => setType(e.target.value)}>In Person</option>
                        <option value='Online' onChange={e => setType(e.target.value)}>Online</option>
                    </select>
                </div>
                <div className="event-form-div">
                    <label htmlfor='event-capacity'>How many people are allowed to attend this event?</label>
                    <input
                        required
                        name="event-capacity"
                        type="number"
                        value={capacity}
                        onChange={e => setCapacity(e.target.value)}
                        min="1" />
                </div>
                <div className="event-form-div">
                    <label htmlfor="event-price">How much will it cost to attend this event?</label>
                    <input
                        required
                        name="event-price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        type='number' />
                </div>
                <div className="event-form-div">
                    <p>When will the event take place?</p>
                    <div>
                        <label htmlfor="event-start-date">Start Date</label>
                        <input
                            required
                            name="event-start-date"
                            type="datetime-local"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlfor="event-end-date">End Date</label>
                        <input
                            required
                            name="event-end-date"
                            type="datetime-local"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)} />
                    </div>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default EventForm;
