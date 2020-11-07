---
title: Quick Soring
date: '2020-11-01 11:36:09'
updated: '2020-11-07 10:37:05'
categories:
  - 1 Data Structure And Algorithm
---
# Quick Sorting

## Implementation

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

