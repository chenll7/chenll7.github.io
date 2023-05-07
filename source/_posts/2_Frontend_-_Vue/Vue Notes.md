---
title: Vue笔记
date: '2020-11-17 00:00:00'
updated: '2023-05-07 20:03:23'
categories:
  - 2 Frontend - Vue
---

# Vue笔记

## CLI

　　几个相关的NPM包：

### NPM包@vue/cli

　　NPM包`@vue/cli`提供命令行工具`vue`，可以用来快速搭建项目。使用示例：
　
```shell
vue create
```

　　推荐的配置里的eslint配置不规范缩进，需要规范缩进的话要手动选择安装的特性，选择Prettier。

### NPM包@vue/cli-service

　　NPM包`@vue/cli-service`提供命令行工具`vue-cli-service`，大致等价于 react-scripts，提供 serve、build 和 inspect 命令。每个 @vue/cli 创建的项目中会安装`@vue/cli-service`。其构建于 webpack 和 webpack-dev-server 之上。

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

## Vue示例

　　Vue实例初始化的时候会通过`Object.defineProperty`方法对`data`属性进行递归遍历，设置get、set以实现响应式特性。运行时需要访问原data的话，需要访问`vm.$data`或者`this.$data`。

## 参考

[^1]: [深入理解vue中的slot与slot-scope](https://juejin.im/post/6844903555837493256)
