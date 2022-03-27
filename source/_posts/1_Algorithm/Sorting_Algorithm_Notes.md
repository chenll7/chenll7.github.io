---
title: 排序算法笔记
date: '2021-06-06 18:11:11'
updated: '2022-03-27 16:58:27'
categories:
  - 1 Algorithm
---
# 排序算法笔记

## 冒泡排序（Bubble Sort）

- 空间复杂度：O(1)。

- 时间复杂度：O(n<sup>2</sup>)。

### 鸡尾酒排序

- 空间复杂度：O(1)。

- 时间复杂度：O(n)~O(n<sup>2</sup>)。

- 相对于冒泡排序的优化：

　　第一步：设置标志位，没有交换则停止。

　　第二步：记录最后一轮交换的位置，下一轮从这开始。

## 选择排序（Selection Sort）

- 空间复杂度：O(1)。

- 时间复杂度：O(n)~O(n<sup>2</sup>)。

- 描述（以升序排列为例）：最小元素交换到最后一位。

## 插入排序（Insertion Sort）

- 空间复杂度：O(1)。

- 时间复杂度：O(n)~O(n<sup>2</sup>)。

## 归并排序（Merge Sort）

- 空间复杂度：O(n)。

- 时间复杂度：O(n<sup>2</sup>)。
- 描述（以升序排列为例）：首先以将数组以长度为1分成多个组，相邻的组进行归并。然后以长度为2分成多个组，可以肯定每个组内已经是升序的了，然后相邻的组进行归并。以此类推，直到整个数组有序。

## 堆排序（Heap Sort）

- 空间复杂度：O(n)。

- 时间复杂度：O(nlogn)

- 描述（以升序排列为例）：要排列的元素形成最小堆，然后依次吐出根元素。　

## 快速排序（Quick Sort）

- 空间复杂度（因为需要用到额外空间）：O(logn)~O(n)。
- 时间复杂度：O(nlogn)~O(n<sup>2</sup>)，平均为O(nlogn)。
- 描述（以升序排列为例）：选取基准，小的放到左边，大的放到右边。

```java
import java.util.Arrays;

public class Main {
    static public void main(String[] argv) {
        var arr = new int[] { 12, 212, 4312, 14234, 2342, 1, 6, 423423 };
        QuickSort.quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}

class QuickSort {
    public static void quickSort(int[] arr, int left, int right) {
        if (arr == null || left >= right || arr.length <= 1)
            return;
        // System.out.println(Arrays.toString(arr));
        int mid = partition(arr, left, right);
        quickSort(arr, left, mid);
        quickSort(arr, mid + 1, right);
    }

    public static int partition(int[] arr, int left, int right) {
		// Record the value of pivot.
        int pivot = arr[left];
        // There is always a position to store the temporary value of swaping in the array. Assign pivot to the position in the end.
        while (left < right) {
            while (arr[right] >= pivot && left < right) {
                right--;
            }
            if (left < right) {
                arr[left] = arr[right];
                ++left;
            }
            while (arr[left] <= pivot && left < right) {
                ++left;
            }
            if (left < right) {
                arr[right] = arr[left];
                --right;
            }
        }
        arr[left] = pivot;
        return left;
    }
}
```

