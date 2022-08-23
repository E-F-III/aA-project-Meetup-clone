import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import groupReducer from './Groups';
import eventReducer from './Events';
import eventDetailsReducer from './EventDetails';
import groupDetailsReducer from './GroupDetails';
import groupEventsReducer from './Group-Events';
import usersGroupReducer from './UsersGroups';

import groupReducerDEV from './devGroups';
import eventReducerDEV from './devEvents';

const rootReducer = combineReducers({
    session: sessionReducer,
    groupsDev: groupReducerDEV,
    eventsDeve: eventReducerDEV,

    groups: groupReducer,
    events: eventReducer,
    eventDetails: eventDetailsReducer,
    groupDetails: groupDetailsReducer,
    groupEvents: groupEventsReducer,
    usersGroups: usersGroupReducer
  });

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
