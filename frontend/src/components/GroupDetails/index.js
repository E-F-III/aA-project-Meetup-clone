import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { getGroupDetails } from '../../store/Groups';

function GroupDetails() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const { groupId } = useParams()

    useEffect(() => {
        dispatch(getGroupDetails(groupId))
    }, [dispatch])

    return (
        <div>Hello from Group Details</div>
    );
}

export default GroupDetails
