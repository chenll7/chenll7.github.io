---
title: Graph Basics
date: '2020-11-01 11:36:09'
updated: '2020-11-07 10:37:05'
categories:
  - 1 Data Structure And Algorithm
---
# Graph Basics

## 概念

- 顶点（Vertex ([pl.]Vertices)）

- 连通分量（Connected Component，这个翻译好恶心啊！）：A connected component of an undirected graph is a subgraph in which any two vertices are connected to each other by paths, and which is connected to no additional vertices in the supergraph.

- 无向连通图（Undirected Connetced Graph）：对于无向图中任意两个节点v<sub>i</sub>和v<sub>j</sub>之间有路径相连。连通图具有连通性（Connectivity）。

- 有向连通图（Directed Connetced Graph）：有向图中任意两个节点v<sub>i</sub>和v<sub>j</sub>之间有v<sub>i</sub>到v<sub>j</sub>路径**或**v<sub>j</sub>和v<sub>i</sub>的路径。

- 强连通图（Strongly Connetced Graph）：有向图中任意两个节点v<sub>i</sub>和v<sub>j</sub>之间有v<sub>i</sub>到v<sub>j</sub>路径**和**v<sub>j</sub>和v<sub>i</sub>的路径。

- 生成树（Spanning Tree）：即极小连通子图（最小连通子图），只有n-1条边。如果生成树中再添加一条边，则必定成环。

- 最小生成树（Minimum Spanning Tree）：同个连通加权无向图的生成树中，所有边的权值和最小的生成树。

## 最小生成树算法

　　最小生成树算法可以用来生成最小生成树和最大生成树：

### Prim算法

　　针对顶点展开的，适合于边数较多的情况。

具体做法：从任意顶点开始，将该定点放入集合S，再找到距离集合S最近的顶点，加入S集合。直到所有定点都加入进来。

### Kruskal算法

　　针对边展开的，适合于边的数量较少的情况。

具体做法：遍历权值从小到大的边，如果边的两个顶点属于不同连通分量（利用并查集），那么将边加入G'，最后G'就是最小生成树。

