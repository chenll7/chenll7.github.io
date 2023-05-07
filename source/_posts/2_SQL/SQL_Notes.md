---
title: SQL笔记
date: '2020-11-01 11:36:11'
updated: '2023-05-07 20:03:33'
categories:
  - 2 SQL
---
# SQL笔记

## 标准SQL

### Data Definition Language (DDL)

　　DDL是这些关键字开头的SQL：CREATE、ALTER、DROP、RENAME、TRUNCATE、COMMENT。　
　　
### Data Query Language (DQL)

　　DQL是这些关键字开头的SQL：SELECT。
　　
#### 表连接常用关键字

- 内连接关键字：`,`、`INNER JOIN`、`JOIN`

- 自然连接关键字：`NATRUAL JOIN`
  - 相当于内连接并隐含“WHERE A.field = B.field”
  
- 左连接关键字：`LEFT JOIN`

- 右连接关键字：`RIGHT JOIN`

#### `EXISTS`关键字和`NOT EXISTS`关键字

示例：

```sql
SELECT * FROM a WHERE EXISTS (SELECT * FROM a WHERE a.foo = b.foo)
```
　　对于`EXISTS`后的子查询来说，如果返回0行，则该`EXISTS`条件返回FALSE，否则该条件返TRUE。从而判断a中记录是否在b中存在。`NOT EXISTS`则相反。
　　
　　`EXISTS`效率比`IN`高，可以用来改写`IN (<子查询>)`这种语句。

### Data Manipulation Language (DML)

　　DML是这些关键字开头的SQL：INSERT、UPDATE、DELETE、MERGE、CALL、EXPLAIN PLAN、LOCK TABLE。

### Data Control Language (DCL)

　　DCL是这些关键字开头的SQL：GRANT、REVOKE。

## Oracle数据库SQL

### Data Definition Language (DDL)

　　DDL是这些关键字开头的SQL：CREATE、ALTER、DROP、RENAME、TRUNCATE、COMMENT。　
　　
#### 新增列

```sql
-- 新增列
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

### Data Query Language (DQL)

　　DQL是这些关键字开头的SQL：SELECT。

### Data Manipulation Language (DML)

　　DML是这些关键字开头的SQL：INSERT、UPDATE、DELETE、MERGE、CALL、EXPLAIN PLAN、LOCK TABLE。

### Data Control Language (DCL)

　　DCL是这些关键字开头的SQL：GRANT、REVOKE。
　　

### 数据类型

#### VARCHAR2

　　VARCHAR和VARCHAR2相同。Oracle推荐使用VARCHAR2，因为工业要求VARCHAR可以存空字符串，但是Oracle的VARCHAR和VARCHAR2都不能存空字符串。
　　
#### DATE类型

　　DATE类型比较大小可以用如下的语法：

```sql
SELECT * FROM FOO WHERE DATA_END_DATE_TIME > DATE '2015-12-31'
SELECT * FROM FOO WHERE DATA_END_DATE_TIME >= TO_DATE('2021-09-25 09:55:00', 'YYYY-MM-DD HH24:MI:SS')
```

### 转义字符

```sql
SELECT '''' || LISTAGG(TAG, ''',''') || '''' FROM TAG_TABLE
    WHERE ID IN ('FIPS03731140')
    AND DATA_START_DATE_TIME >= TO_DATE('2021-09-25 08:30:00', 'YYYY-MM-DD HH24:MI:SS')
    AND DATA_END_DATE_TIME >= TO_DATE('2021-09-25 08:30:00', 'YYYY-MM-DD HH24:MI:SS')
    GROUP BY ID
```

　　最后结果为：`'呼呼呼','喵喵喵','呼呼呼'`
