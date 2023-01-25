import React from 'react'

function EventGeneralInfo({ event }) {
    const date = new Date(event?.endDate)
    return (
        <div className='details-general-info w70'>
            <div className='flex-column'>
                <span className='uppercase text16 textcolor-grey'>{date.toDateString()}</span>
                <span className='bold text25'>{event.name}</span>
            </div>
        </div>
    )
}

export default EventGeneralInfo;
