---
title: CSS笔记
date: '2020-11-01 11:36:10'
updated: '2020-11-04 22:14:24'
categories:
  - 2.03 Frontend
---
# CSS笔记

## 字体

### font-family属性

　　使用`font-family`来指定使用的字体时，最后一个字体一般sans-serif。

　　sans-serif就是无衬线字体，是一种通用字体族；对应的，serif是衬线字体。

　　常见的无衬线字体有 Trebuchet MS、Tahoma、Verdana,Arial、Helvetica、幼圆、隶书等等。

　　font-family最后加上sans-serif，也是为了保证能够调用这个字体族里面的字体，因为大多数计算机里都有这种字体。

## 表格

### border-collapse属性

　　原生表格单元格之间是有间隙的，为了消除间隙，这时候应该以下属性：

```CSS
border-collapse:collapse;
```

- separate：默认值。边框会被分开。不会忽略 border-spacing 和 empty-cells 属性。

- collapse：如果可能，边框会合并为一个单一的边框。会忽略 border-spacing 和 empty-cells 属性。

- inherit

### table-layout属性

　　原生表格单元格大小随着内容改变，使用以下属性改变行为：

- automatic：默认。自动表格布局，列宽度由单元格内容设定。

- fixed：固定表格布局，水平布局仅取决于表格宽度、列宽度、表格边框宽度、单元格间距，而与单元格的内容无关。

- inherit：

## 参考

[^1]: [想要学CSS应该如何入门？](https://www.zhihu.com/question/24826065/answer/194294438)
