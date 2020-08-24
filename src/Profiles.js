import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";
import WithRouterSample from "./WithRouterSample";

const Profiles = ({ match }) => {
  const activeStyle = {
    background: "black",
    color: "white"
  };
  return (
    <div>
      <h3>User List</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/velopert">
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/azeroth">
            azeroth
          </NavLink>
        </li>
      </ul>
      <Route path="/profiles" exact render={() => <div>choose the user</div>} />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
