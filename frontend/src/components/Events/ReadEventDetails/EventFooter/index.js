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
            <div className='w70 flex-row-align-center flex-row-justify-between padding5'>
                <div>
                    <p>{date.toDateString()}</p>
                    <p>{event.name}</p>
                </div>
                <div>
                    <button className='return' hidden={(sessionUser) && sessionUser.id === group.organizerId ? false : true} onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className='flex-row-align-center w30 padding5'>
                <div>
                    <p>Price: ${event.price}</p>
                    <p>{Number(event.capacity) - Number(event.numAttending)} spots left</p>
                </div>
            </div>
        </div>
    )
}

export default EventFooter;
