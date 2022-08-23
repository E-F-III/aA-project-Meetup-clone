import React from 'react'
import { Route, Switch } from "react-router-dom";

import GroupsList from '../Groups/ReadGroupsList';
import EventsList from '../Events/ReadEventsList';

import ListsNav from './ListsNav'

function FindPage() {

    return (
        <>
            <ListsNav />
            <Switch>
                <Route exact path='/events'>
                    {/* <EventsList /> */}
                </Route>
                <Route exact path='/find/groups'>
                    <GroupsList />
                </Route>
            </Switch>
        </>
    )
}

export default FindPage
