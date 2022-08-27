import React from 'react'

function EventGeneralInfo({ event }) {
    const date = new Date(event?.endDate)
    return (
        <div className='details-general-info w70'>
            <div>
                <p>{date.toDateString()}</p>
                <h2>{event.name}</h2>
            </div>
        </div>
    )
}

export default EventGeneralInfo;
