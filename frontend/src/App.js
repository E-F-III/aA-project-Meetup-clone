import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import FindPage from "./components/FindEventsAndGroups";
import GroupDetails from "./components/Groups/ReadGroupDetails";


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
        <>
          <Switch>
            <Route exact path='/'>
              <SplashPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/find">
              <FindPage />
            </Route>
            <Route path="/groups/:groupId">
              <GroupDetails />
            </Route>
          </Switch>
        </>
      )}


    </>
  );
}

export default App;
