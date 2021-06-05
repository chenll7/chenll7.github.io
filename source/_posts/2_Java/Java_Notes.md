---
title: Java笔记
date: '2020-11-01 11:36:10'
updated: '2021-10-16 19:57:08'
categories:
  - 2 Java
---
# Java笔记

## 环境变量配置

### Windows

#### 配置JAVA_HOME

　　JAVA_HOME指定了系统当前默认使用的JDK。将JAVA_HOME设置为JDK安装目录，例如`C:\Program Files\Java\jdk-12.0.2`。

#### 配置CLASSPATH

　　CLASSPATH是类搜索路径，告诉JVM如何搜索Java的类，值一般设置为`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`（表示当前目录、`%JAVA_HOME%\lib\dt.jar`和`%JAVA_HOME%\lib\tools.jar`）。　
#### 修改PATH

　　安装目录的bin子目录里有java、javac等命令的可执行文件，为了能在任何位置调用这些命令，所以要将`%JAVA_HOME%\bin`加入PATH环境变量。

## jar包

　　jar包是class文件的归档文件。

## javac使用

　　javac用于将Java源文件编译成字节码文件。在Windows下编译UTF-8编码的源文件可以执行`javac -encoding utf8 <源文件路径>`。

## JRE（Java Runtime Environment）制作

　　Java11以后不再提供JRE下载，需要使用jlink手工定制JRE。例如：

```sh
jlink --module-path jmods --add-modules java.base --output myjre
```

　　对于例如JavaFX之类的库来说是必须的，不然运行时会提示找不到库。目前JavaFX是第一个使用Jmod的依赖，以后对于Java程序跨平台部分使用Jar，Native使用Jmod。

> Java平台的领导者们意识到了随着虚拟化、容器化、微服务化的普及和流行，以前庞大的JRE已经跟不上时代的发展：作为一个运行时，里面经常包含了太多不需要的东西。比如，如果一台主机上的某个JRE仅仅是用来运行Apache Tomcat，那么JRE中用来支持SWT的部分肯定是不需要的，及浪费空间又降低效率。

> 引入Module System，使得开发者能够按自己的应用创建一个最小的运行时成为了可能——你的一个微服务的部署应用仅仅需要一个非常小的Runtime（比如仅仅20m）——而不是像以前一样不管应用复杂还是简单，都需要一个上百兆的JRE作为Runtime。横向扩展和部署的效率将能大幅提升。[^1]

## 常用类库

### 字节码增强

　　所谓字节码增强，实质就是在编译期或运行期对字节码进行插桩，以便在运行期影响程序的执行行为。例如Spring的AOP就是使用了字节码增强技术。常用类库：

- Byte Buddy

## 参考

[^1]: [为什么新发布的jdk11不带jre？ - 知乎](https://www.zhihu.com/question/296351428/answer/500599249)
