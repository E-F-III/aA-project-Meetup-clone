import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editEventDetails, getEventDetails } from '../../store/EventDetails';
import { deleteAnEvent } from "../../../store/Events";


function EditEventForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const event = useSelector(state => state.eventDetails)

    const { eventId } = useParams()

    // const [venueId, setVenueId] = useState(event?.Venue?.id)
    const [name, setName] = useState(event?.name)
    const [type, setType] = useState(event?.type)
    const [capacity, setCapacity] = useState(event?.capacity)
    const [price, setPrice] = useState(event?.price)
    const [description, setDescription] = useState(event?.description)
    const [startDate, setStartDate] = useState(event?.startDate)
    const [endDate, setEndDate] = useState(event?.endDate)

    const [validationErrors, setvalidationErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // console.log(eventId, 'inside use effect')
        dispatch(getEventDetails(eventId))
            .then((res)=> {
                setName(res.name)
                setType(res.type)
                setCapacity(res.capacity)
                setPrice(res.price)
                setDescription(res.description)
            })
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        const errors = []

        if (name?.length < 5) errors.push('Name must have at least 5 characters')
        if (description?.length < 50) errors.push('Description must be at least 50 characters')
        if (new Date(startDate) <= new Date()) errors.push('Start date must be in the future')
        if (new Date(endDate) < new Date(startDate)) errors.push('End date must be after the start date')

        setvalidationErrors(errors)

    }, [name, startDate, endDate])


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

        const data = await dispatch(editEventDetails(event.id, newEvent))

        history.push(`/events/${event.id}/about`)
    }

    const handleDelete = async e => {
        e.preventDefault()
        const data = await dispatch(deleteAnEvent(event.id))

        history.push(`/groups/${event.groupId}/about`)
    }

    return isLoaded && (
            <div>
                <form onSubmit={handleSubmit}>
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
                        <p>{description?.length} characters</p>

                    </div>
                    <div className="event-form-div">
                        <label htmlFor='event-type'>Will this event be in person or offline?</label>
                        <select
                            required
                            name='event-type'
                        >
                            <option value='In Person' onChange={e => setType(e.target.value)}>In Person</option>
                            <option value='Online' onChange={e => setType(e.target.value)}>Online</option>
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
                            data-type="currency" />
                    </div>
                    <div className="event-form-div">
                        <p>When will the event take place?</p>
                        <div>
                            <label htmlFor="event-start-date">Start Date</label>
                            <input
                                required
                                name="event-start-date"
                                type="datetime-local"
                                value={startDate}
                                max={"9999-12-31T00:00"}
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
                    <button onClick={handleDelete}>Delete</button>
                    <button type="submit" disabled={isSubmitted && validationErrors.length > 0}>Submit</button>
                </form>
            </div>
    )
}

export default EditEventForm
