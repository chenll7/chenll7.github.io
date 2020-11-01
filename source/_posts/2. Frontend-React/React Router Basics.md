---
title: React Router Basics
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Frontend-React
---
# React Router Basics

## Route标签

```jsx
<Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
<Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
<Route exact path="/app" render={props => <Foo {...props} />} />
```

　　其中`render`、`component`属性都可以指定该路由下展示的组件。如果要展示的组件是一个inline component，例如`props => <Foo {...props} />`，`component`会造成每次状态更新时会挂载和解挂载，而`render`只会更新已存在的组件。`render`不能用于展示非匿名函数组件。具体区别可以看看[react router difference between component and render](https://stackoverflow.com/questions/48150567/react-router-difference-between-component-and-render)。

## URL参数

　　可以通过路由传递参数，示例如下[^1]：

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

// URL参数是URL中以冒号开头的占位符，
// 例如在此示例的路由中定义的`id`参数
// 类似的约定也同样用于匹配其他流行的Web框架（如Rails和Express）中的动态段
export default function ParamsExample() {
  return (
    <Router>
      <div>
        <h2>Accounts</h2>

        <ul>
          <li>
            <Link to="/netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/modus-create">Modus Create</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/:id" children={<Child />} />
        </Switch>
      </div>
    </Router>
  );
}

function Child() {
  // 我们可以在这里使用`useParams`钩子来访问
  // URL的动态段
  let { id } = useParams();
  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
```

## props.match.path与props.match.url的区别

　　使用URL参数的时候，在路由的子模块中`props.match.path`为路由，例如`/:id`，而`props.match.url`为实际路径，如`/netflix`。未使用URL参数时两者值相同。

## 参考

[^1]:[React Router(react-router&react-router-dom)相关整理](https://itbilu.com/nodejs/npm/react-router.html)
