import React from "react";
import { withRouter } from "react-router-dom";

const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h1>location</h1>
      <textarea
        value={JSON.stringify(location, null, 2)}
        rows={7}
        readOnly={true}
      ></textarea>
      <h1>match</h1>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly={true}
      ></textarea>
      <h1>history</h1>
      <button onClick={() => history.push("/")}>Home</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
