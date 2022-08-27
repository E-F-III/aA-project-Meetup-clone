import React from 'react';
import { NavLink } from 'react-router-dom';

function GroupMiniCard({ group }) {

    return (
        <NavLink to={`/groups/${group.id}/about`}>
            <div id='minicard-inner-div'>
                <div id='minicard-previewimage'>
                    <img
                        src={group.images.length > 0 ? group.images[0].url : ""}
                        hidden={group.images.length > 0 ? false : true}
                    />
                </div>
                <div id='minicard-group-info'>
                    <div id='minicard-group-title'>{group.name}</div>
                    <div id='minicard-grou-footer'>{group.private ? 'Private' : 'Public'} group</div>
                </div>
            </div>
        </NavLink>
    )
}

export default GroupMiniCard;
