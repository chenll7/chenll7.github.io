---
title: TCP协议和UDP协议学习笔记
date: '2020-11-01 11:36:10'
updated: '2020-11-07 10:37:05'
categories:
  - 1 Network
---
# TCP协议和UDP协议学习笔记

## TCP协议

### TCP报头

　　简而言之，TCP报头有：

- 来源和目的端口号
- 序号（seq，每次通信开始时是各自随机生成的，随后每次通信递增）
- 确认号（ack，每次回复对方对应的包的seq+1）
- 标志位（SYN、FIN、ACK、PSH、RST，只有PSH表示有数据）
- 窗口大小

![](TCP_header_format.png)

### TCP的建立和断开

建立连接的三次传输：

![](TCP_connection_establishment.png)

断开连接的四次传输：

![](TCP_connection_termination.png)

![](TCP_Life_Cycle.jpg)

## 参考

[1^]: <https://www.cnblogs.com/chengyunshen/p/7196348.html>

[2^]: <https://www.cnblogs.com/newwy/p/3234536.html>

[3^]: <https://blog.csdn.net/MBuger/article/details/74078777>
