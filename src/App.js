import React, { Component } from "react";
import { Route, Link, jsHistory } from "./mini-react-router-history";
import { HashRoute, HashLink } from "./mini-react-router-hash";

const Home = () => "Home";
const About = () => "About";
const Topics = () => "Topics";
const A = () => "A";
const B = () => "B";
const C = () => "C";

class Button extends Component {
  render() {
    const { to, children } = this.props;
    return <button onClick={() => jsHistory.pushState(to)}>{children}</button>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div>HistoryRouter</div>
        <hr />
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
        <Button to="/">Home</Button>
        <Button to="/about">About</Button>
        <Button to="/topics">Topics</Button>
        <button
          onClick={() => {
            window.history.pushState(
              { someState: "hello" },
              null,
              window.location.pathname
            );
            this.forceUpdate();
          }}
        >
          push-with-state
        </button>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        {JSON.stringify(window.history.state)}
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
        <HashRoute path="/a" component={A} />
        <HashRoute path="/b" component={B} />
        <HashRoute path="/c" component={C} />
      </div>
    );
  }
}

export default App;
