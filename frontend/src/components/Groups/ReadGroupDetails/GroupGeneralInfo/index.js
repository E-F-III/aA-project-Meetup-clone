import React from 'react'

function GroupGeneralInfo({ group }) {
    return (
        <div className='details-general-info flex-row'>
            <div className='flex-row-center w70 padding20'>
                <div className='header-img'>
                    <img className='cover'
                        src={group.images.length > 0 ? group.images[0].url : ""}
                        style={{ visibility: `${group.images.length > 0 ? "visible" : "hidden"}` }}
                    />
                </div>
            </div>
            <div className='flex-column header-about w30 padding20'>
                <h1>{group.name}</h1>
                <ul className='list-no-style'>
                    <li>{group.city}, {group.state}</li>
                    <li>{group.numMembers} members • {group.private ? 'Private' : 'Public'} group</li>
                    <li>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</li>
                </ul>
            </div>
        </div>
    )
}

export default GroupGeneralInfo;
