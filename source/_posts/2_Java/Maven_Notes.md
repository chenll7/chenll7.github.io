---
title: Maven笔记
date: '2020-11-01 11:36:10'
updated: '2022-04-13 10:55:03'
categories:
  - 2 Java
---
# Maven笔记

## 概念

- Lifecycle 内置的有default、clean和site三种Lifecycle。

- Phase：每个Lifecycle有若干个Phase。

- Goal：每个Phase对于Plugin来说是一个Goal。

- Plugin：一个Plugin可以对应一个Goal，或者说一个Phase。

## 仓库

　　分为本地仓库和远程仓库。远程仓库分为中央仓库、私服和其他公共库。

## 设置文件

  　　Maven的设置文件`settings.xml`有全局级别和用户级别，前者位于Maven安装目录内`${maven.home}/conf/settings.xml`，后者位于用户家目录的下的`${user.home}/.m2/settings.xml`。
  　　
　　`settings.xml`的顶级元素如下所示[^3]：
　　

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                          https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository/>
  <interactiveMode/>
  <offline/>
  <pluginGroups/>
  <servers/>
  <mirrors/>
  <proxies/>
  <profiles/>
  <activeProfiles/>
</settings>
```

### 设置镜像仓库

　　由于Maven从中央仓库下载依赖和插件的速度太慢，使用如下配置可以配置**阿里源**加快下载速度：
　　
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <pluginGroups>
  </pluginGroups>
  <proxies>
  </proxies>
  <servers>
  </servers>
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  <profiles>
  </profiles>
</settings>
```

## Archetypes

　　Archetype is a Maven project templating toolkit。

　　根据官网文档[^4]，我们可以执行类似以下命令来生成原型项目，一般最常用的是**maven-archetype-quickstart**：

```shell
mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DgroupId=org.fbcll -DartifactId=demo
```

或在Powershell下：

```powershell
mvn archetype:generate "-DarchetypeGroupId=org.apache.maven.archetypes" "-DarchetypeArtifactId=maven-archetype-quickstart" "-DarchetypeVersion=1.4" "-DgroupId=org.fbcll" "-DartifactId=demo"
```

　　根据官网文档[^5]，官方提供以下原型：

| Archetype ArtifactIds |                         Description                          |
| :--------------------------: | :--------------------------------------------------------: |
| maven-archetype-archetype   |     An archetype to generate a sample archetype project.     |
| maven-archetype-j2ee-simple | An archetype to generate a simplifed sample J2EE application. |
| maven-archetype-mojo        |   An archetype to generate a sample a sample Maven plugin.   |
| maven-archetype-plugin      |       An archetype to generate a sample Maven plugin.        |
| maven-archetype-plugin-site |     An archetype to generate a sample Maven plugin site.     |
| maven-archetype-portlet     |      An archetype to generate a sample JSR-268 Portlet.      |
| **maven-archetype-quickstart** |       An archetype to generate a sample Maven project.       |
| maven-archetype-simple      |       An archetype to generate a simple Maven project.       |
| maven-archetype-site        | An archetype to generate a sample Maven site which demonstrates some of the supported document types like APT, XDoc, and FML and demonstrates how to i18n your site. |
| maven-archetype-site-simple |        An archetype to generate a sample Maven site.         |
| maven-archetype-webapp      |   An archetype to generate a sample Maven Webapp project.    |

## 使用Maven Wrapper

　　某些项目中想要让所有项目参与者共享同个Maven版本，可以使用Maven Wrapper。在项目根目录下执行：

```shell
# 获得最新版本
mvn -N io.takari:maven:wrapper
# 或者指定某个历史特定版本
mvn -N io.takari:maven:0.7.7:wrapper
```

会生成文件`mvnw.cmd`（Windows下使用的可执行批处理文件）、文件`mvnw`（类UNIX下使用的可执行脚本）、目录`.mvn`，并将这仨加入版本控制，就可以让所有项目参与者共享同个Maven版本。

## 编译 JDK 11 项目

　　默认的编译插件 org.apache.maven.plugins:maven-compiler-plugin 中 target 和 source 配置项的默认值为 1.7 。如果需要编译 JDK 11 项目，需要这么配置：

```xml
  <properties>
    <maven.compiler.release>11</maven.compiler.release>
    <!-- ... -->
  </properties>
  <!-- ... -->
```

这其实相当于以前的：

```xml
  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <!-- ... -->
  </properties>
  <!-- ... -->
```

相当于直接在插件中配置：

```xml
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.0</version>
        <configuration>
          <source>11</source>
          <target>11</target>
        </configuration>
      </plugin>
    </plugins>
    <!-- ... -->
  </build>
  <!-- ... -->
```

## References

[^1]: [Introduction to the Build Lifecycle]()
[^2]: [Maven：mirror和repository 区别](https://my.oschina.net/sunchp/blog/100634)
[^3]: <https://maven.apache.org/settings.html>
[^4]: <https://maven.apache.org/archetypes/maven-archetype-quickstart/>
[^5]: <https://maven.apache.org/guides/introduction/introduction-to-archetypes.html>

