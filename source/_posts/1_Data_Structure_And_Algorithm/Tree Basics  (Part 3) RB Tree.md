---
title: Tree Basics  (Part 3) RB Tree
date: '2020-11-01 11:36:10'
updated: '2020-11-07 10:37:05'
categories:
  - 1 Data Structure And Algorithm
---
# Tree Basics (Part 3): RB Tree

## 定义

![](RB_tree_sample.jpg)

　　红黑树的特性:

1. 每个节点或者是黑色，或者是红色。

2. 根节点是黑色。

3. 每个叶子节点（NIL）是黑色。 这里叶子节点，是指为空(NIL或NULL)的叶子节点。

4. 如果一个节点是红色的，则它的子节点必须是黑色的。

5. 从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。

注意：

(1)特性3中的叶子节点，是只为空(NIL或null)的节点。

(2)特性5确保没有一条路径会比其他路径长出俩倍。因而，红黑树是相对是接近平衡的二叉树。

(3)一棵含有n个节点的红黑树的高度至多为2log(n+1)。

## 查找

　　时间复杂度为O(logN)。

## 插入

　　时间复杂度为O(logN)。

## 删除

　　时间复杂度为O(logN)。
　　
## References

- <https://baike.baidu.com/item/%E4%BA%8C%E5%8F%89%E6%8E%92%E5%BA%8F%E6%A0%91/10905079?fr=aladdin&fromid=7077965&fromtitle=%E4%BA%8C%E5%8F%89%E6%9F%A5%E6%89%BE%E6%A0%91>

- <http://www.cnblogs.com/skywang12345/p/3245399.html>
