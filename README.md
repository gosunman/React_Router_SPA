# 😁 SPA란?

- Single Page Application
- 기존에는 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아왔다.
- 요즘은 웹에 정보가 정말 많기 때문에 성능상의 문제가 발생할 수 있다.
- 바뀌지 않아도 되는 부분까지 새로 불러와서 보여주는 부분은 비효율적이다.
- 그래서 렌더링을 사용자 브라우저가 담당하고 인터렉션이 발생하면 필요한 부분만 바꾸는 SPA가 나왔다
- SPA의 경우 서버에서 사용자에게 제공하는 페이지는 한 종류이지만, 주소 상태에 따라 다양한 화면을 보여줄 수 있다.

# 😭 SPA의 단점

- 앱의 규모가 커지면 자바스크립트 파일이 너무 커진다.
- 페이지 로딩 시 사용자가 실제로 방문하지 않을 수도 있는 페이지의 스크립트를 불러오기 때문이다.
- 하지만 나중에 배울 코드 스플리팅을 사용하면 라우트별로 파일들을 나누어서 트래픽과 로딩 속도를 개선할 수 있다.
- 리액트 라우터처럼 브라우저에서 자바스크립트를 사용하여 라우팅을 관리하지 않는 것은 자바스크립트를 실행하지 않는 일반 크롤로에서는 페이지의 정보를 제대로 수집해가지 못한다는 단점이 따른다.
- 따라서 구글이나 네이버 같은 검색 엔진의 검색 결과에 페이지가 잘 나타나지 않을 수도 있다.
- 이러한 단점들은 서버 사이드 렌더링을 통해 모두 해결 가능하다.

# 🤣 프로젝트 준비 및 기본적인 사용법

- yarn add react-router-dom

## Link

- 일반 웹 애플리케이션에서는 a 태그를 사용하여 페이지를 전환한다.
- 하지만 리액트에는 그걸 직접 사용하면 상태가 다 날아가고 페이지를 새로 불러오기 때문에 사용하면 안된다.
- 그래서 Link를 사용하여 페이지를 전환한다.
- Link는 페이지의 주소만 변경해 준다.
- 내부적으론 a 태그로 되어 있지만 페이지 전환을 방지하는 기능이 내장되어 있다.

```js
// index.js
// ...
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// home.js
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the main page</p>
    </div>
  );
};

export default Home;

// App.js
import React from "react";
import "./styles.css";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";

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
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true}></Route>
      <Route path="/about" component={About}></Route>
    </div>
  );
}
```

# 😍 URL 파라미터와 쿼리

```js
// Profile.js
import React from "react";

const data = {
  Velopert: {
    name: "Kim Sunman",
    description: "the master of react"
  },
  Azeroth: {
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
    </div>
  );
};

export default Profile;

// App.js
//...

export default function App() {
  return (
    <div className="App">
      <ul>
        // ...
        <li>
          <Link to="/profile/Velopert">Velopert profile</Link>
        </li>
        <li>
          <Link to="/profile/Azeroth">Azeroth profile</Link>
        </li>
      </ul>
      <hr />
      // ...
      <Route path="/profile/:username" component={Profile}></Route>
    </div>
  );
}
```

## URL Query

- url query는 location 객체의 search에서 값을 조회할 수 있다.

```js
// location object example
// "http://localhost:3000/about?detail=true"
{
  "pathname":"/about",
  "search":"?detail=true",
  "hash":""
}
```

## qs

- 쿼리 문자열을 객체로 변환해주는 라이브러리
- 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열이라는 점 주의
- ?value=1에서 value="1"로 변환된다.
- ?value=true에서 value="true"로 변환된다.
- boolean이나 숫자 같은 것들도 전부 문자열로 변환된다!

```js
// About.js
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // 맨 앞의 ?를 생략
  });

  const showDetail = query.detail === "true"; // 쿼리의 파싱 결과 값은 문자열

  // ...
};
```

# 🙄 서브 라우트

- 서브 라우트란 라우트 내부에서 또 라우트를 정의하는 것을 의미한다.

```js
// Profiles.js
import React from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = ({ match }) => {
  return (
    <div>
      <h3>User List</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/azeroth">azeroth</Link>
        </li>
      </ul>
      <Route path="/profiles" exact render={() => <div>choose the user</div>} />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
```

# 😐 리액트 라우터 부가 기능

## history

- history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props 중 하나이다.
- 뒤로 가기나 로그인 후 화면 전환, 다른 페이지로 이탈하는 것 방지 등을 할 때 사용됨.

```js
import React, { Component } from "react";

class HistorySample extends Component {
  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleGoHome = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    // 페이지에 변화가 생길 때마다 정말 나갈 것인지 묻는다
    this.unblock = this.props.history.block("really?");
  }

  componentWillUnMount() {
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>goBack</button>
        <button onClick={this.handleGoHome}>goHome</button>
      </div>
    );
  }
}

export default HistorySample;
```

## withRouter

- withRouter는 HoC(Higher-order Component)이다.
- 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해준다.

```js
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
```

## Switch

- Switch 컴포넌트는 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링시켜 준다.
- Switch를 사용하면 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지도 구현할 수 있다.

```js
// App.js
<Switch>
  // ...
  <Route
    render={({ location }) => (
      <div>
        <h2>Not Found</h2>
        <p>{location.pathname}</p>
      </div>
    )}
  ></Route>
</Switch>
```

## NavLink

- 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트
- NavLink에서 링크가 활성화되었을 때의 스타일을 적용할 때는 activeStyle 값을, CSS 클래스를 적용할 때는 activeClassName 값을 props로 넣어 주면 됩니다.

```js
import { NavLink, Route } from "react-router-dom";
// ...

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
      // ...
    </div>
  );
};
export default Profiles;
```

# 🙃 꿀팁

## props를 설정할 때 값을 생략하면 자동으로 ={true}가 붙는다.

## JSON.stringify("object", null, 2)

- 두 번째와 세 번째 파라미터를 null과 2로 설정해주면 JSON에 들여쓰기가 적용된 상태로 문자열이 만들어진다.
