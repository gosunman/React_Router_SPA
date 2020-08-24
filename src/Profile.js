import React from "react";
import WithRouterSample from "./WithRouterSample";

const data = {
  velopert: {
    name: "Kim Sunman",
    description: "the master of react"
  },
  azeroth: {
    name: "Prodo",
    description: "Young Rich"
  }
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];

  if (!profile) {
    return <div> No one like that! de re dat that derererere</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default Profile;
