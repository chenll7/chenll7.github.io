---
title: Binary Search Basics
date: '2020-11-01 11:36:09'
updated: '2020-11-07 10:37:05'
categories:
  - 1 Data Structure And Algorithm
---
# Binary Search Basics

## 二分查找法

　　二分查找法典型的有三种模式，可以参考[《二分法的三个区间控制套路》](https://zhuanlan.zhihu.com/p/25906225)。

### 第一种形式

　　基本形式如下：

```java
public int search(int[] nums, int target) {
    int l = 0;// 左边界
    int r = nums.length-1;// 右边界
    while (l <= r) {
        int m = l + (r - l) / 2;//避免溢出
        // System.out.println(String.format("%d,%d,%d", l, r, m));
        if (nums[m] < target) {
            l = m + 1;
        } else {// nums[m] >= target
            r = m - 1;
        }
    }
    return l;
}
```

以上这个函数返回数组中第一个不小于target的元素的下标，其搜索区间是[l,r]，循环终止条件是l-r=1。如果搜索数组[1, 2, 2, 5, 6]，搜索举例如下：

- 如果targe为-1，返回0。

- 如果target为1，返回0。

- 如果target为2，返回1。

- 如果target为3，返回3。

- 如果target为5，返回3。

- 如果target为6，返回4。

- 如果target为8，返回5。

　　如果在不重复的数组中查找某个特定的数：

```java
public int search(int[] nums, int target) {
    int l = 0;// 左边界
    int r = nums.length - 1;// 右边界
    while (l <= r) {
        int m = l + (r - l) / 2;//这种算法一定程度避免溢出
        // System.out.println(String.format("%d,%d,%d", l, r, m));
        if (nums[m] == target) {
            return m;
        } else if (nums[m] < target) {
            l = m + 1;
        } else {// nums[m] > target
            r = m - 1;
        }
    }
    // 如果搜索区间收缩到最后从循环里出来了，需要进行判断。因为l可能停留在nums.length，同时若target不在数组中，nums[l]为不小于target的那个数，所以需要进一步判断。
    return l == nums.length ? -1 : (nums[l] == target ? l : -1);
}
```

### 第二种形式

　　基本形式如下：

```java
public int searchGreaterEqual(int[] nums, int target) {
    int l = 0;// 左边界
    int r = nums.length;// 右边界
    while (l < r) {
        int m = l + (r - l) / 2;//避免溢出
        // System.out.println(String.format("%d,%d,%d", l, r, m));
        if (nums[m] < target) {
            l = m + 1;
        } else {// nums[m] >= target
            r = m;
        }
    }
    return l;
}
```

　　以上这个函数返回数组中第一个不小于target的元素的下标，其搜索区间是[l,r)，循环终止条件是l==r。如果搜索数组[1, 2, 2, 5, 6]，搜索举例如下：

- 如果targe为-1，返回0。

- 如果target为1，返回0。

- 如果target为2，返回1。

- 如果target为3，返回3。

- 如果target为5，返回3。

- 如果target为6，返回4。

- 如果target为8，返回5。

　　如果在不重复的数组中查找某个特定的数：

```java
public int search(int[] nums, int target) {
        int l = 0;// 左边界
        int r = nums.length;// 右边界
        while (l < r) {
            int m = l + (r - l) / 2;//这种算法一定程度避免溢出
            // System.out.println(String.format("%d,%d,%d", l, r, m));
            if (nums[m] == target) {
                return m;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {// nums[m] > target
                r = m;
            }
        }
        // 如果搜索区间收缩到最后从循环里出来了，需要进行判断。因为l可能停留在nums.length，同时若target不在数组中，nums[l]为不小于target的那个数，所以需要进一步判断。
        return l == nums.length ? -1; (nums[l] == target ? l : -1);
    }
```

## 参考

[^1]: [二分查找算法详解](https://www.cxyxiaowu.com/2843.html)
