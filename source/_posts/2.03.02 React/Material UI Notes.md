---
title: Material UI笔记
date: '2020-11-01 11:36:10'
updated: '2020-11-04 22:14:24'
categories:
  - 2.03.02 React
---
# Material-UI笔记

　　Material UI是一个基于React的组件库。

## 样式方案

　　推荐使用`CSS in JS`的方案。例子如下：

```JSX
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

　　`CSS in JS`和`CSS Modules`的方案能保证样式局限在组件内，而不会污染全局。

　　对于和CSS组合器（Combinator）和伪选择器（Pseudo），实现方法见以下例子：

```JSX
import React from "react";
import ReactDOM from "react-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  a: {
    // &表示a类，$b表示b类
    "&:hover ~ $b": {
      backgroundColor: "#ccc"
    }
  },
  b: {}
});
function App() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.a}>This is a</div>
      <div className={classes.b}>This is b</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

