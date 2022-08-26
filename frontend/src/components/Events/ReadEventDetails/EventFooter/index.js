import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteEventThunk } from '../../../../store/Events';

function EventFooter({ event, group }) {
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    const history = useHistory()

    const date = new Date(event?.startDate)

    const handleDelete = async e => {
        e.preventDefault()
        const data = dispatch(deleteEventThunk(event.id))

        history.push(`/groups/${group.id}`)
    }

    return (
        <div className='w70 flex-row'>
            <div className='w70 flex-row-justify-between'>
                <div>
                    <p>{date.toDateString()}</p>
                    <h3>{event.name}</h3>
                </div>
                <div>
                    <button className='default' hidden={(sessionUser) && sessionUser.id === group.organizerId ? false : true} onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className='flex-row-align-center w30'>
                <div>
                    <h3>Price: ${event.price}</h3>
                    <h3>{Number(event.capacity) - Number(event.numAttending)} spots left</h3>
                </div>
            </div>
        </div>
    )
}

export default EventFooter;
