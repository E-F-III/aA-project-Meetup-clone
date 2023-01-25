import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";

import FindPage from "./components/FindEventsAndGroups";
import GroupForm from "./components/Groups/CreateGroupForm";
import GroupDetails from "./components/Groups/ReadGroupDetails";

import EventDetails from "./components/Events/ReadEventDetails";
import GroupsOfUser from "./components/Groups/ReadUsersGroups";

import FooterInfo from "./components/FooterInfo";
import SignupFormPage from "./components/SignupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id='1st-child' className="h100 w100">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route path="/find">
            <FindPage />
          </Route>
          <Route path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route exact path="/create-group">
            <GroupForm />
          </Route>
          <Route path="/your-groups">
            <GroupsOfUser />
          </Route>
          {/* <Route path="/signup">
              <SignupFormPage />
          </Route> */}
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </div>
  )
}

export default App;
