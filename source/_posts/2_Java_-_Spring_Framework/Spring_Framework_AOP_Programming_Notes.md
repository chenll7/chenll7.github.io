---
title: Spring框架AOP编程笔记
date: '2021-06-03 14:42:20'
updated: '2021-06-03 15:59:52'
categories:
  - 2 Java - Spring Framework
---
# Spring框架AOP编程笔记

　　AOP编程的概念不再详细介绍。

## 示例[^1]

如果将一个大剧场看成一个系统，里面很多演出厅则是系统中的一条条不同的业务线，演出厅的主要业务代码是实现自身的演出。但是每个演出厅都会有观众，观众的进场，喝彩，以及演出失败的退票，大剧场系统也必须要要处理。这个时候就可以把观众看成一个切面。统一在切面管理观众的行为。如：入场前关闭手机、就座、喝彩、演出不尽人意时要求退款。

首先剧场有一个通用的演出接口

```java
package com.zhy.edu.aop;

/**
 * 
 * <p>Title:</p>
 * <p>Description:演出通用接口</p>
 * @author zhyHome 
 * @date 2019年8月11日  
 * @version 1.0
 */
public interface Performance {

    /**
     * 
     * <p>@Title: perform</p>   
     * <p>@Description: 演出</p>  
     * @author zhyHome 
     * @date 2019年8月11日   
     * @param:       
     * @return: void      
     * @throws   
     * @version 1.0
     */
    public void perform() throws Exception;
}
```

观众类，然后观众会基于演出做出一系列的行为

```java
package com.zhy.edu.aop;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Configuration;

/**
 * 
 * <p>Title:</p>
 * <p>Description:观众切面</p>
 * @author zhyHome 
 * @date 2019年8月11日  
 * @version 1.0
 */
@Aspect
@Configuration
public class Audience {
    
    /**
     * 
     * <p>@Title: performance</p>   
     * <p>@Description: 通用切点</p>  
     * @author zhyHome 
     * @date 2019年8月11日   
     * @param:       
     * @return: void      
     * @throws   
     * @version 1.0
     */
    @Pointcut("execution(** com.zhy.edu.aop.Performance.perform(..))")
    public void performance() {};

    /**
     * 
     * <p>@Title: beforeMethod</p>   
     * <p>@Description: 关闭手机（调用通用切点时只需要写通用切点的方法名）</p>  
     * @author zhyHome 
     * @date 2019年8月11日   
     * @param:       
     * @return: void      
     * @throws   
     * @version 1.0
     */
    @Before("performance()")
    public void silenceCellPhone() {
        System.out.println("观众表演之前关闭手机");
    }
    
    /**
     * 
     * <p>@Title: takeSeats</p>   
     * <p>@Description: 观众就坐</p>  
     * @author zhyHome 
     * @date 2019年8月11日   
     * @param:       
     * @return: void      
     * @throws   
     * @version 1.0
     */
    @Before("performance()")
    public void takeSeats() {
        System.out.println("观众就坐");
    }
    
    /**
     * 
     * <p>@Title: applause</p>   
     * <p>@Description: 观众喝彩</p>  
     * @author zhyHome 
     * @date 2019年8月11日   
     * @param:       
     * @return: void      
     * @throws   
     * @version 1.0
     */
    @AfterReturning("performance()")
    public void applause() {
        System.out.println("观众喝彩");
    }
    
    /**
     * 
     * <p>@Title: demandRefund</p>   
     * <p>@Description: 观众退款</p>  
     * @author zhyHome 
     * @date 2019年8月11日   
     * @param:       
     * @return: void      
     * @throws   
     * @version 1.0
     */
    @AfterThrowing("performance()")
    public void demandRefund() {
        System.out.println("观众退款");
    }
}
```

泰坦尼克演出厅

```java
package com.zhy.edu.aop;

import org.springframework.stereotype.Component;

/**
 * 
 * <p>Title:</p>
 * <p>Description:泰坦尼克话剧</p>
 * @author zhyHome 
 * @date 2019年8月11日  
 * @version 1.0
 */
@Component
public class TitanicDrama implements Performance{

    @Override
    public void perform() throws Exception {
        int random = ((int)(10 * Math.random()))%2;
        System.out.println("泰坦尼克话剧演出中");
        if (random == 1) {
            System.out.println("完美演出");
        }else {
            System.err.println("演出失败");
            throw new Exception();
        }
    }

}
```

执行演出业务代码（junit测试类）

```java
package com.zhy.edu;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.zhy.edu.aop.SwiftDrama;
import com.zhy.edu.aop.TitanicDrama;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

    @Autowired
    TitanicDrama performance;
    
    @Autowired
    SwiftDrama swiftDrama;

    /**
     * 
     * <p>@Title: performance</p>   
     * <p>@Description: 演出厅测试</p>  
     * @author zhyHome 
     * @date 2019年8月11日   
     * @param:       
     * @return: void      
     * @throws   
     * @version 1.0
     */
    @Test
    public void performance() {
        try {
            System.out.println("---------------------演出厅1:--------------------");
            performance.perform();
            
        } catch (Exception e) {
        }
        
        try {
            System.out.println("---------------------演出厅2:--------------------");
            swiftDrama.perform();
        } catch (Exception e) {
        }
    }

}
```

输出结果：

![](Spring_Framework_AOP_Programming_Notes\19179872-4e30072a9db6f3e5.webp)

　　这个例子成功的将观众提取成了切面。@Aspect注解的好处是可以将一个普通的POJO变成一个切面，例如观众类。观众可以在此类中管理自己的行为。我们只需要监听演出方法就好了，演出之前之后如何调用就交给Spring，很方便。

## @Before、@AfterReturning、@AfterThrowing、@Around注解

　　除了上述例子中使用的@Before、@AfterReturning、@AfterThrowing注解，还可以使用@Around注解来实现切点前后执行的功能。
　　
## execution、@annotation函数

　　上述例子使用了execution函数来告诉Spring哪些包下的函数为切点。
　　
　　还可以使用@annotation函数来告诉Spring某些使用了注解的函数为切点。例子如下：
　　
```java
@Retention(RetentionPolicy.RUNTIME)//保留期限
@Target(ElementType.METHOD)//目标类型
public @interface Log {
    boolean value() default true;//声明成员变量
}
```

```java
@Aspect
public class AnnotationAspect {

    @Pointercut("@annotation(log)")
    public void stream(Log) {
    
    }

    @Around("stream(log)")
    public void log(ProceedingJoinPoint joinPoint, Log log) throws Throwable {
        joinPoint.proceed();
        System.out.println("新增日志");
    }
}
```

　　这样所有标注Log注解的函数执行前都会执行log函数。

## 参考

[^1]:(Spring AOP @Aspect注解)[https://www.jianshu.com/p/51d184146f57]
