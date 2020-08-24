import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // 맨 앞의 ?를 생략
  });

  const showDetail = query.detail === "true"; // 쿼리의 파싱 결과 값은 문자열

  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
      {showDetail && <p>detail is True!!</p>}
    </div>
  );
};

export default About;
