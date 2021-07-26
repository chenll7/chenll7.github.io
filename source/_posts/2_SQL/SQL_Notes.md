---
title: SQL笔记
date: '2020-11-01 11:36:11'
updated: '2021-07-13 11:33:02'
categories:
  - 2 SQL
---
# SQL笔记

## 标准SQL

### 表连接

- 内连接

  - 关键字：`,`、`INNER JOIN`、`JOIN`

- 自然连接
  - 相当于内连接并隐含“WHERE A.field = B.field”
  - 关键字：`NATRUAL JOIN`
  
- 左连接

  关键字：`LEFT JOIN`

- 右连接

  关键字：`RIGHT JOIN`

## Oracle数据库SQL

### Data Definition Language (DDL)

　　CREATE、ALTER、DROP、RENAME、TRUNCATE、COMMENT。
　　
#### 新增列

```sql
-- 新增
ALTER TABLE <表名> ADD ID VARCHAR(120);
-- 设置注释
comment on column <表名>.<字段> is '注释';
```

#### 更换主键

```sql
-- 查找主键id
select constraint_name from user_constraints where table_name='TABNAME'; -- KEY_ID代表上面查到的主键id,  删除主键约束
alter table TABNAME drop constraint KEY_ID;
-- 括号中填其他列名，一个或多个
alter table TABNAME add primary key(another_col,...);
```

#### 设置列非空

```sql
alter table <表名> modify <字段名> not null;
```

### Data Query Language (DQl)

　　SELECT。

### Data Manipulation Language (DML)

　　INSERT、UPDATE、DELETE、MERGE、CALL、EXPLAIN PLAN、LOCK TABLE。

### Data Control Language (DCL)

　　GRANT、REVOKE。
　　

### 数据类型

#### VARCHAR2

　　VARCHAR和VARCHAR2相同。Oracle推荐使用VARCHAR2，因为工业要求VARCHAR可以存空字符串，但是Oracle的VARCHAR和VARCHAR2都不能存空字符串。
　　
#### DATE类型

　　DATE类型比较大小可以用如下的语法：

```sql
SELECT * FROM FOO WHERE DATA_END_DATE_TIME >= DATE '2015-12-31'
```
