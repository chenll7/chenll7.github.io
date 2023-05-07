---
title: Java Web笔记
date: '2020-11-01 11:36:10'
updated: '2023-05-07 20:03:26'
categories:
  - 2 Java
---
# Java Web笔记

## Servlet[^1]

　　Servlet是一个被编译好的Java类。Web容器的启动需要依赖Servlet，当Web服务器开始执行时，Servlet类就被初始化。
　　
　　当用户通过浏览器访问输入URI的时候，这个时候Web服务器就通过Servlet来分发请求执行不同的内容。

　　对于SpringMVC来说，一般可以采用如下方式载入Servlet。在`/src/main/webapp/WEB-INF/web.xml`中：

```xml
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>
  <servlet>
    <servlet-name>spring-dispatcher</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>spring-dispatcher</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>
```

　　这里使用了SpringMVC框架的DispatcherServlet。运行时SpringMVC从`spring-dispatcher-servlet.xml`读取配置并创建Servlet。　　
## References

[^1]: [servlet和Spring的DispatcherServlet详解](https://blog.csdn.net/yalishadaa/article/details/70544492)
