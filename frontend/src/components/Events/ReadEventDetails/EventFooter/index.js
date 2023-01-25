import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteEventThunk } from '../../../../store/Events';

function EventFooter({ event, group, setIsLoaded }) {
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    const history = useHistory()

    const date = new Date(event.startDate)

    const handleDelete = async e => {
        e.preventDefault()
        setIsLoaded(false)
        const data = await dispatch(deleteEventThunk(event.id))

        history.push(`/groups/${group.id}/about`)
    }

    return (
        <div className='w70 flex-row'>
            <div className='w70 flex-row-align-center flex-row-justify-between padding5'>
                <div className='flex-column text16'>
                    <span className='uppercase textcolor-grey'>{date.toDateString()}</span>
                    <span className='text20 bold'>{event.name}</span>
                </div>
                <div>
                    <button className='return' hidden={(sessionUser) && sessionUser.id === group.organizerId ? false : true} onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className='flex-row-align-center w30 padding5'>
                <div className='flex-column text16'>
                    <span className='uppercase textcolor-grey'>Price: ${event.price}</span>
                    <span className='text20 bold'>{Number(event.capacity) - Number(event.numAttending)} spots left</span>
                </div>
            </div>
        </div>
    )
}

export default EventFooter;
