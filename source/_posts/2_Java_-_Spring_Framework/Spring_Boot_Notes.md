---
title: Spring Boot Notes
date: '2020-11-04 11:36:10'
updated: '2022-03-27 16:50:49'
categories:
  - 2 Java - Spring Framework
---
# Spring Boot Notes

## Quick Start

Open [Spring Initializr](https://start.spring.io/), and fill in the form, then generate a new spring boot project. If the project need the web ability, you need also add the dependency `Spring Web`.

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
