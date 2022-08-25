import React from 'react';
import { NavLink } from 'react-router-dom';

import './GroupCard.css'

function GroupCard({ group }) {
  return (
    <NavLink className='navLink card flex-row' to={`/groups/${group.id}/about`}>
        <div className='card-left flex-row center padding20'>
          <div className='card-image-container'>
            <img
              className='group-image'
              src={group.previewImage?.length > 0 ? group.previewImage : ""}
              style={{ visibility: `${group.previewImage?.length > 0 ? "visible" : "hidden"}` }}
            />
          </div>
        </div>
        <div className='card-right flex-column'>
          <div className='card-title'>
            <h3 className='group-card-title font20'>{group.name}</h3>
            <h4 className='group-card-location textcolor-gold text14 uppercase'>{group.city}, {group.state}</h4>
          </div>
          <div className='card-about'>
            <p className='card-about-group text14 textcolor-grey'>{group.about}</p>
          </div>
          <div className='card-footer'>
            <p className='card-about-group text14 textcolor-grey'>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</p>
          </div>
        </div>
    </NavLink>
  )
}

export default GroupCard
