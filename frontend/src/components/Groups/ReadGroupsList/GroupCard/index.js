import React from 'react';
import { NavLink } from 'react-router-dom';

import './GroupCard.css'

function GroupCard({ group }) {
  return (
    <>
      <NavLink className='navLink' key={group.id} to={`/groups/${group.id}/about`}>
        <div className='group-card'>
          <div className='card-image'>
            <img
              className='group-image'
              src={group.previewImage?.length > 0 ? group.previewImage : ""}
              style={{ visibility: `${group.previewImage?.length > 0 ? "visible" : "hidden"}` }}
            />
          </div>
          <div>
            <div className='card-title'>
              <h3 className='group-card-title'>{group.name}</h3>
              <h4 className='group-card-location'>{group.city}, {group.state}</h4>
            </div>
            <p className='card-about-group'>{group.about}</p>
            <p className='card-about-group'>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</p>
          </div>
        </div>
      </NavLink>
    </>
  )
}

export default GroupCard
