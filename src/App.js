import React from "react";
import "./styles.css";
import { Route, Link, Switch } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profiles from "./Profiles";
import HistorySample from "./HistorySample";

export default function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profiles">profile</Link>
        </li>
        <li>
          <Link to="/history">history</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact={true}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/profiles" component={Profiles}></Route>
        <Route path="/history" component={HistorySample}></Route>
        <Route
          render={({ location }) => (
            <div>
              <h2>Not Found</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        ></Route>
      </Switch>
    </div>
  );
}
