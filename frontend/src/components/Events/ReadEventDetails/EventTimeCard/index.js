import React from 'react'

function EventTimeCard({ date, endDate, venue }) {
    let startString = date.toString()
    let startarr = startString.split(' ')
    startString = startarr.slice(0, 5).join(' ')

    let endString = endDate.toString()
    let endarr = endString.split(' ')
    endString = endarr.slice(0, 5).join(' ')

    return (
        <div id='event-time-card' className='padding20 verticalMargin10 minicard text14 textcolor-grey'>
            <div id='event-time'>
                <p>{startString} to</p>
                <p>{endString}</p>
            </div>
            <div id='event-venue'>
                <p>{venue}</p>
            </div>
        </div>
    )
}

export default EventTimeCard;
