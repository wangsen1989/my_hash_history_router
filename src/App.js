import React, { Component } from "react";
import { Route, Link, jsHistory } from "./mini-react-router-history";
import { HashRoute, HashLink } from "./mini-react-router-hash";

const Home = () => 'Home';
const About = () => 'About';
const Topics = () => 'Topics';
const A = () => "A";
const B = () => "B";
const C = () => "C";

class BtnHome extends Component {
  render() {
    return <button onClick={jsHistory.pushState.bind(this, "/")}>Home</button>;
  }
}

class BtnAbout extends Component {
  render() {
    return (
      <button onClick={jsHistory.pushState.bind(this, "/about")}>About</button>
    );
  }
}

class BtnTopics extends Component {
  render() {
    return (
      <button onClick={jsHistory.pushState.bind(this, "/topics")}>
        Topics
      </button>
    );
  }
}

const App = () => (
  <div>
    <div>HistoryRouter</div>

    <ul className="nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>

    <BtnHome />
    <BtnAbout />
    <BtnTopics />
    <hr />

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/topics" component={Topics} />
    <hr style={{ marginTop: 200 }} />
    <div>hashRouter</div>
    <hr />

    <ul className="nav">
      <li>
        <HashLink to="/a">a</HashLink>
      </li>
      <li>
        <HashLink to="/b">b</HashLink>
      </li>
      <li>
        <HashLink to="/c">c</HashLink>
      </li>
    </ul>
    <HashRoute  path="/a" component={A}/>
    <HashRoute  path="/b" component={B}/>
    <HashRoute  path="/c" component={C}/>
  </div>
);

export default App;
