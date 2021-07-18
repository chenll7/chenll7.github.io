---
title: SQL笔记
date: '2020-11-01 11:36:11'
updated: '2021-07-05 15:31:20'
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

### VARCHAR2

　　VARCHAR和VARCHAR2相同。Oracle推荐使用VARCHAR2，因为工业要求VARCHAR可以存空字符串，但是Oracle的VARCHAR和VARCHAR2都不能存空字符串。
　　
### DATE类型

　　DATE类型比较大小可以用如下的语法：

```sql
SELECT * FROM FOO WHERE DATA_END_DATE_TIME >= DATE '2015-12-31'
```
