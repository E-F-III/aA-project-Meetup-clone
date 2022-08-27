import React from 'react'

function EventTimeCard({ date, endDate, venue }) {
    return (
        <div id='event-time-card'>
            <div id='event-time'>
                <p>{date.toString()} to</p>
                <p>{endDate.toString()}</p>
            </div>
            <div id='event-venue'>
                <p>{venue}</p>
            </div>
        </div>
    )
}

export default EventTimeCard;
