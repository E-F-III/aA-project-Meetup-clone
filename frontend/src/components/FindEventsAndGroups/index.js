import React from 'react'
import { Route, Switch } from "react-router-dom";

import GroupsList from '../Groups/ReadGroupsList';
import EventsList from '../Events/ReadEventsList';

import ListsNav from './ListsNav'

function FindPage() {

    return (
        <div className='main-div align-center flex-column'>
            <div style={{margin:"10px 0px 5px 0px"}}>
                <ListsNav />
            </div>
            <div>
                <Switch>
                    <Route exact path='/find/events'>
                        <EventsList />
                    </Route>
                    <Route exact path='/find/groups'>
                        <GroupsList />
                    </Route>
                </Switch>
            </div>

        </div>
    )
}

export default FindPage
