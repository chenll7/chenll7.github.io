---
title: C++ STL tuple
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Programming in C++
---
# C++ STL tuple

　　std::tuple 是固定大小的异类值汇集。

```cpp
auto student = std::make_tuple(3.8, 'A', "Lisa Simpson");
double gpa = std::get<0>(student);
char grade = std::get<1>(student);
std::string name = std::get<2>(student);
```

```cpp
double gpa;
char grade;
std::string name;
std::tie(gpa, grade, name) = std::make_tuple(2.9, 'C', "Milhouse Van Houten");
```

```cpp
// C++17 结构化绑定：
auto [ gpa, grade, name ] = std::make_tuple(1.7, 'D', "Ralph Wiggum");
```
