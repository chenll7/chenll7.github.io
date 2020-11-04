---
title: React Basics
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:24:47'
categories:
  - 2.3.2 React
---
[TOC]

# React Basics

## 钩子（Hooks）

### useState

　　用于声明一个状态（State)。

```jsx
const [state, setState] = useState({foo: "foo", foo2: "foo2"});
```

### useEffect

　　用于在组件更新时执行对应回调函数。useEffect的第二个参数用于指定只有当数组中的变量发生变化时，组件更新时才调用回调函数。

```jsx
// 组件挂载时执行回调函数
useEffect(()=>{
    console.log("Mounting...");
    // 组件解挂载时执行以下回调函数
    return ()=>{
        console.log("Unmounting");
    };
})

// 组件只在第一次挂载时执行回调函数
useEffect(()=>{
    console.log("Mounting...");
    // 组件解挂载时执行以下回调函数
    return ()=>{
        console.log("Unmounting");
    };
}, [])

// 组件挂载时发现state发生了变化才执行回调函数
useEffect(()=>{
    console.log("Mounting...");
    // 组件解挂载时执行以下回调函数
    return ()=>{
        console.log("Unmounting");x
    };
}, [state])
```

### useReducer

　　useReducer用来简化状态（State）过多或者更新状态的逻辑过于复杂的情况，将更新状态的逻辑集中编写，便于维护。以下是一个登录的例子[^1]。

```jsx
const initState = {
    name: '',
    pwd: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
}
function loginReducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case 'success':
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
            }
        case 'error':
            return {
                ...state,
                error: action.payload.error,
                name: '',
                pwd: '',
                isLoading: false,
            }
        default: 
            return state;
    }
}
function LoginPage() {
    const [state, dispatch] = useReducer(loginReducer, initState);
    const { name, pwd, isLoading, error, isLoggedIn } = state;
    const login = (event) => {
        event.preventDefault();
        dispatch({ type: 'login' });
        login({ name, pwd })
            .then(() => {
            dispatch({ type: 'success' });
        })
            .catch((error) => {
            dispatch({
                type: 'error'
                payload: { error: error.message }
                     });
        });
    }
    return ( x
        //  返回页面JSX Element
    )
}
```

### useContext

　　上下文（Context）用于跨节点层级传递状态，相当于全局变量。以下是一个登录的例子[^2]。

```jsx
// 定义初始化值
const initState = {
    name: '',
    pwd: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
}
// 定义state[业务]处理逻辑 reducer函数
function loginReducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case 'success':
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
            }
        case 'error':
            return {
                ...state,
                error: action.payload.error,
                name: '',
                pwd: '',
                isLoading: false,
            }
        default: 
            return state;
    }
}
// 定义 context函数
const LoginContext = React.createContext();
function LoginPage() {
    const [state, dispatch] = useReducer(loginReducer, initState);
    const { name, pwd, isLoading, error, isLoggedIn } = state;
    const login = (event) => {
        event.preventDefault();
        dispatch({ type: 'login' });
        login({ name, pwd })
            .then(() => {
            dispatch({ type: 'success' });
        })
            .catch((error) => {
            dispatch({
                type: 'error'
                payload: { error: error.message }
                     });
        });
    }
    // 利用 context 共享dispatch
    return ( 
        <LoginContext.Provider value={dispatch}>
        <...>
        <LoginButton />
        </LoginContext.Provider>
)
}
function LoginButton() {
    // 子组件中直接通过context拿到dispatch，出发reducer操作state
    const dispatch = useContext(LoginContext);
    const click = () => {
        if (error) {
            // 子组件可以直接 dispatch action
            dispatch({
                type: 'error'
                payload: { error: error.message }
                     });
        }x
    }
}
```

## 输入框组件

```js
<TextField value={state} onChange={async (event) => { setState(event.target.value) }} />
```

## 参考

[^1]: [这一次彻底搞定useReducer-使用篇](https://juejin.im/post/5d072b0e5188256147327ba7)
[^2]: [这一次彻底搞定 useReducer - useContext使用](https://juejin.im/post/5d072b5e518825490d53dee6)
