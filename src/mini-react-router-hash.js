// mini-react-router-dom.js
import React, { Component } from "react";

let instances = []; // 用来存储页面中的 Router
const register = comp => instances.push(comp);
const unRegister = comp => instances.splice(instances.indexOf(comp), 1);

window.addEventListener("hashchange", () => {
  // 遍历所有 Route，强制重新渲染所有 Route
  instances.forEach(instance => {
    instance.forceUpdate();
    console.log("hashchange", window.location.hash);
  });
});

window.addEventListener("load", () => {
  // 遍历所有 Route，强制重新渲染所有 Route
  instances.forEach(instance => instance.forceUpdate());
});

// 判断 Route 的 path 参数与当前 url 是否匹配
const matchPath = (pathname, options) => {
  const { path, exact = false } = options;
  const match = new RegExp(`^${path}`).exec(pathname);
  if (!match) return null;
  const url = match[0];
  const isExact = pathname === url;
  if (exact && !isExact) return null;
  return {
    path,
    url
  };
};

export class HashLink extends Component {
  render() {
    const { to, children } = this.props;
    return <a href={to.replace("/", "#")}>{children}</a>;
  }
}

export class HashRoute extends Component {
  componentWillMount() {
    register(this);
  }

  render() {
    const { path, component, exact } = this.props;
    const match = matchPath(window.location.hash.replace("#", "/"), {
      path,
      exact
    });

    // Route 跟当前 url 不匹配，就返回 null
    if (!match) return null;

    if (component) {
      return React.createElement(component);
    }
  }

  componentWillUnMount() {
    unRegister(this);
  }
}
