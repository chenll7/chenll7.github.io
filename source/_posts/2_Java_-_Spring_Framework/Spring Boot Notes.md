---
title: Spring Boot Notes
date: '2020-11-04 11:36:10'
updated: '2020-11-07 10:42:25'
categories:
  - 2 Java - Spring Framework
---
# Spring Boot Notes

## CLI Helper

Download Spring Boot CLI from [Installing the Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-manual-cli-installation)[^1]. Then run the following command after add the executable file to the environment variable `PATH`:

```Shell
spring init --groupId org.fbcll --boot-version 2.3.1 --build maven --dependencies web --java-version 11 --artifactId demo --name demo
```

## Annotations

- Controller: Create a controller, which usually returns generally view (HTML + CSS + JavaScript).

- RestController: Create a controller, which usually returns data in form of JSON or XML as REST API.

## References

[^1]: [Installing the Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-manual-cli-installation)

[^2]: [Initialize a New Project](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-cli.html#cli-init)
