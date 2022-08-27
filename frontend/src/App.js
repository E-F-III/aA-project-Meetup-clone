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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="w100vw">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div>
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
          </Switch>
        </div>
      )}
<<<<<<< HEAD
    </>
=======
      {/* <footer>
        <FooterInfo />
      </footer> */}
    </div>
>>>>>>> dev
  );
}

export default App;
