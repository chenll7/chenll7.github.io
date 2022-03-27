---
title: Common Algorithms
date: '2020-11-01 11:36:09'
updated: '2022-03-27 16:50:20'
categories:
  - 1 Algorithm
---
# Common Alogorithms

## LRU（Least Recently Used）

参考：<https://www.cnblogs.com/-OYK/archive/2012/12/05/2803317.html>

## KMP算法

　　检查字符串A是否在字符串B中。生成字符串A的部分匹配表。在A和B上移动检查点时要参考部分匹配表。

代码：<https://github.com/furrybear/templates/blob/master/algorithms/KMP_algorithm.cpp>

## 尺取法

参考：<https://zhuanlan.zhihu.com/p/31425915>

问题：给定一个数组和一个数S，在这个数组中找一个区间，使得这个区间之和等于S。

答案：

1. 用一对脚标i, j。最开始都指向第一个元素。

2. 如果区间i到j之和比S小，就让j往后挪一位，并把sum的值加上这个新元素。相当于蚯蚓的头向前伸了一下。

3. 如果区间i到j之和比S大，就让sum减掉第一个元素。相当于蚯蚓的尾巴向前缩了一下。

4. 如果i到j之和刚好等于S，则记录。

## 最大M子段和

参考：<https://blog.csdn.net/zuzhiang/article/details/78450380>

　　给定由n个整数（可能为负）组成的序列,以及一个正整数M，要求确定序列的M个不相交子段，使这M个子段的总和最大。（有时候会要求M不小于序列中正整数的数量，这样题才有解的意义。）

解法：dp[i][j]表示前j项所构成i子段的最大和，且必须包含着第j项，即以第j项结尾：

1. dp[i][j] = dp[i][j-1] + a[j]，即把第j项融合到第 j-1 项的子段中，子段数没变

2. dp[i][j] = dp[i-1][t] + a[j]，（i-1 <= t < j）
