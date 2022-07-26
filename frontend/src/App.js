import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupsList from "./components/Groups";
import GroupDetails from "./components/GroupDetails";
import EventsList from "./components/EventsList";
import EventDetails from "./components/EventDetails";
import GroupForm from "./components/GroupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/groups">
            <GroupsList />
          </Route>
          <Route exact path="/events">
            <EventsList />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route path='/group-form'>
            <GroupForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
