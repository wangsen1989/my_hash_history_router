// mini-react-router-dom.js
import React, { Component } from 'react';

let instances = [];  // 用来存储页面中的 Router
const register = (comp) => instances.push(comp);
const unRegister = (comp) => instances.splice(instances.indexOf(comp), 1);

// 利用 js 改变路由
const historyPush = (path) => {
  // 第一步：改变 url 展示
  window.history.pushState({}, null, path);
  // 第二步：重新渲染各个路由的组件
  instances.forEach(instance => instance.forceUpdate())
};

// 浏览器前进后退键，改变路由
window.addEventListener('popstate', () => {
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
  }
};

export class Link extends Component {

  handleClick = (event) => {
    event.preventDefault();
    const { to } = this.props;
    historyPush(to);
  };

  render() {
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

export class Route extends Component {
  componentWillMount() {
    register(this);
  }

  render() {
    const { path, component, exact } = this.props;
    const match = matchPath(window.location.pathname, { path, exact });

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

// 这里之所以要导出一个 jsHistory，
// 是为了方便使用者在 JS 中直接控制导航
export const jsHistory = {
  pushState: historyPush
};
