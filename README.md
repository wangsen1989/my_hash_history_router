
### 运行项目
`npm install && npm satrt`

### 原理概要

* `const A = () => 'A'`
* `<Link to='/xxx'>xxx</Link>`
* `<Route path='xxx' component={A} />`
* `const allComponents = []`
* 在 Route 组件 componentWillMount 时，向 allComponents 传入 component 实例，供重新渲染时调用实例的 forceUpdate
#### hashRouter


* 1: 将 Link 组件渲染为 `<a href='#xxx'>xxx</a>`
* 2: 点击 a 标签，url 中的 hash 会变化，会触发 window.hashchange 事件
* 3: 在 hashchange 里遍历并重新渲染所有 Route 组件【forceUpdate】
* 4: Route 组件判断当前 location 中的 hash 是否和自己 props 传进的 path 匹配，不匹配返回 null 【react.createElement(component)】


#### historyRouter

* 1: 将 Link 组件渲染为 `<a href='xxx' onClick={someEvent}>xxx</a>`
* 2: 点击 a 标签，someEvent 里阻止默认跳转， history.pushState(state, title, url) 改变 url 展示
* 3: 遍历并重新渲染所有 Route 组件【forceUpdate】
* 4: Route 组件判断当前 location 中的 pathname 是否和自己 props 传进的 path 匹配，不匹配返回 null 【react.createElement(component)】
* 5: 点击浏览器前进后退会触发 window.popstate 事件，事件监听函数里执行 3