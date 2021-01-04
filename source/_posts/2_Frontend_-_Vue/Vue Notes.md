---
title: Vue笔记
date: '2020-11-17 00:00:00'
updated: '2021-01-04 16:53:57'
categories:
  - 2 Frontend - Vue
---

# Vue笔记

## .vue文件

　　文件扩展名为.vue的表示一个单文件组件。其导出（export）的是一个符合Vue规范的纯Object，表示一个Vue的组件，一般如下所示：
```javascript
{
    data: (...)
    methods: (...)
    render: (...)
    staticRenderFns: (...)
    _compiled: (...)
    beforeCreate: (...)
    beforeDestroy: (...)
}
```

## 插槽（Slot）使用

　　Vue中slot可以分为三种，匿名插槽、命名插槽、作用域插槽。详情见[深入理解vue中的slot与slot-scope](https://juejin.im/post/6844903555837493256)。

## 参考

[^1]: [深入理解vue中的slot与slot-scope](https://juejin.im/post/6844903555837493256)
