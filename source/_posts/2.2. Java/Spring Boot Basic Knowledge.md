---
title: Spring Boot Basic Knowledge
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:24:47'
categories:
  - 2.2. Java
---
# Spring Boot Basic Knowledge

## CLI Helper

Download Spring Boot CLI from [Installing the Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-manual-cli-installation)[^1]. Then run the following command after add the executable file to the environment variable `PATH`:

```sh
spring init --groupId org.fbcll --boot-version 2.3.1 --build maven --dependencies web --java-version 11 --artifactId demo --name demo
```

## Controller

Usually return generally view (HTML + CSS + JavaScript).

## RestController

Usually return data in form of JSON or XML as REST API.

## References

[^1]: [Installing the Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-manual-cli-installation)

[^2]: [Initialize a New Project](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-cli.html#cli-init)
