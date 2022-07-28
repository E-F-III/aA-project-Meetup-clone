import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails } from '../../store/EventDetails';


function EditEventForm() {

    const { eventId } = useParams()
    const event = useSelector(state => state.eventDetails)

    const [venueId, setVenueId] = useState()
    const [name, setName] = useState()
    const [type, setType] = useState()
    const [capacity, setCapacity] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const [isLoaded, setIsLoaded] = useState(false)


    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getEventDetails(eventId))
        .then((res) => {
            setVenueId(res.venueId)
            setName(res.name)
            setType(res.type)
            setCapacity(res.capacity)
            setPrice(res.price)
            setDescription(res.description)
            setStartDate(res.startDate)
            setEndDate(res.endDate)
        })
        .then(() => setIsLoaded(true))
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault()

        const newEvent = {
            venueId, name, type, capacity, price, description, startDate, endDate
        }

        console.log(newEvent)
    }

    const handleDelete = async e => {
        e.preventDefault()
    }

    return ( isLoaded &&
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <input />


                <button>Dont Click Me</button>
            </form>
        </div>
        </>
    )
}

export default EditEventForm
