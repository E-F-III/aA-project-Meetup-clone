import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
        if (price < 0) errors.push('Price can not be a negative value')
        if (new Date(startDate) <= new Date()) errors.push('Start date must be in the future')
        if (new Date(endDate) < new Date(startDate)) errors.push('End date must be after the start date')

        setvalidationErrors(errors)

    }, [name, description, startDate, endDate])

    const handleSubmit = async e => {
        e.preventDefault()

        setIsSubmitted(true)
        console.log(price)
        // handle event dates for local time

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
        <form onSubmit={handleSubmit}>
            <h2>Create an event!</h2>

            {isSubmitted && validationErrors.length > 0 &&
                <ul>
                    {validationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>}

            <div className="event-form-div">
                <h3>Event Name</h3>
                <input
                    required
                    name="event-name"
                    value={name}
                    maxLength='50'
                    onChange={e => setName(e.target.value)} />
                <span className="text14 textcolor-grey">{name.length} characters</span>
            </div>

            <div className="event-form-div">
                <h3>About this event</h3>
                <textarea
                    required
                    rows='13'
                    cols='76'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    maxLength='1000'
                    placeholder='Please write at least 50 characters'
                    name='event-about' />
                <span className="text14 textcolor-grey">{description.length} characters</span>
            </div>

            <div className="event-form-div">
                <h3>Will this event be in person or online?</h3>
                <select name='type' value={type} onChange={e => setType(e.target.value)} >
                    <option value='In person'>In Person</option>
                    <option value='Online'>Online</option>
                </select>
            </div>

            <div className="event-form-div">
                <h3>How many people are allowed to attend this event?</h3>
                <input
                    required
                    name="event-capacity"
                    type="number"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    min="1"
                    max="100" />
            </div>

            <div className="event-form-div">
                <h3>How much will it cost to attend this event?</h3>
                <input
                    required
                    name="event-price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    min='0'
                    maxLength='4'
                    type='currency' />
            </div>

            <div className="event-form-div">
                <h3>When will the event take place?</h3>
                <div>
                    <h4>Start Date</h4>
                    <input
                        required
                        name="event-start-date"
                        type="datetime-local"
                        max={"9999-12-31T00:00"}
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)} />
                </div>
                <div>
                    <h4>End Date</h4>
                    <input
                        required
                        name="event-end-date"
                        type="datetime-local"
                        value={endDate}
                        max={"9999-12-31T00:00"}
                        onChange={e => setEndDate(e.target.value)} />
                </div>

                <div className="flex-row-justify-between">
                    <button className="return" style={{ visibility: 'hidden' }}></button>
                    <button className="default">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default EventForm;
