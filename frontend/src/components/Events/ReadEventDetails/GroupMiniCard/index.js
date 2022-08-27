import React from 'react';
import { NavLink } from 'react-router-dom';

function GroupMiniCard({ group }) {

    return (
        <div className='verticalMargin10 padding20 minicard'>

            <NavLink className='navLink ' to={`/groups/${group.id}/about`}>
                <div id='minicard-inner-div' className='flex-row'>
                    <div id='minicard-previewimage' className='minicard-image padding5'>
                        <img
                            className='minicard-image'
                            src={group.images.length > 0 ? group.images[0].url : ""}
                            hidden={group.images.length > 0 ? false : true}
                        />
                    </div>
                    <div id='minicard-group-info padding5'>
                        <div id='minicard-group-title'>{group.name}</div>
                        <div id='minicard-grou-footer'>{group.private ? 'Private' : 'Public'} group</div>
                    </div>
                </div>
            </NavLink>
        </div>

    )
}

export default GroupMiniCard;
