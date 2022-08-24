import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';

import { createEventThunk } from "../../../store/Events";

import './CreateEventForm.css'

function EventForm({ group }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const groupId = group.id

    // const [venueId, setVenueId] = useState()
    const [name, setName] = useState('')
    const [type, setType] = useState('In Person')
    const [capacity, setCapacity] = useState(1)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [validationErrors, setvalidationErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        const errors = []

        if (name.length < 5) errors.push('Name must have at least 5 characters')
        if (description.length < 50) errors.push('Description must be at least 50 characters')
        if (new Date(startDate) <= new Date()) errors.push('Start date must be in the future')
        if (new Date(endDate) < new Date(startDate)) errors.push('End date must be after the start date')

        setvalidationErrors(errors)

    }, [name, description, startDate, endDate])

    const handleSubmit = async e => {
        e.preventDefault()

        setIsSubmitted(true)

        if (validationErrors.length > 0) return

        const newEvent = {
            // venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        }

        const payload = { groupId, newEvent }

        const data = await dispatch(createEventThunk(payload))

        history.push(`/events/${data.id}`)
    }

    return (
        <div className="form-div">
            <form onSubmit={handleSubmit}>
                <h1>Create an event!</h1>
                {isSubmitted && validationErrors.length > 0 &&
                    <ul>
                        {validationErrors.map(error => <li key={error}>{error}</li>)}
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
                    <label htmlFor="event-about">About this event</label>
                    <textarea
                        required
                        rows='13'
                        cols='76'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        placeholder='Please write at least 50 characters'
                        name='event-about' />
                    <p>{description.length} characters</p>
                </div>
                <div className="event-form-div">
                    <label htmlFor='event-type'>Will this event be in person or online?</label>
                    <select name='type' value={type} onChange={e => setType(e.target.value)} >
                        <option value='In person'>In Person</option>
                        <option value='Online'>Online</option>
                    </select>
                </div>
                <div className="event-form-div">
                    <label htmlFor='event-capacity'>How many people are allowed to attend this event?</label>
                    <input
                        required
                        name="event-capacity"
                        type="number"
                        value={capacity}
                        onChange={e => setCapacity(e.target.value)}
                        min="1" />
                </div>
                <div className="event-form-div">
                    <label htmlFor="event-price">How much will it cost to attend this event?</label>
                    <input
                        required
                        name="event-price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        min={0}
                        type='number' />
                </div>
                <div className="event-form-div">
                    <p>When will the event take place?</p>
                    <div>
                        <label htmlFor="event-start-date">Start Date</label>
                        <input
                            required
                            name="event-start-date"
                            type="datetime-local"
                            max={"9999-12-31T00:00"}
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="event-end-date">End Date</label>
                        <input
                            required
                            name="event-end-date"
                            type="datetime-local"
                            value={endDate}
                            max={"9999-12-31T00:00"}
                            onChange={e => setEndDate(e.target.value)} />
                    </div>
                </div>
                <button className="default">Submit</button>
            </form>
        </div>
    )
}

export default EventForm;
