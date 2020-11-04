---
title: Modulo_Operation
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:24:47'
categories:
  - 1.10 Mathematics
---
参考：<https://baike.baidu.com/item/%E5%8F%96%E6%A8%A1%E8%BF%90%E7%AE%97/10739384?fr=aladdin>

　　有限域涉及求模，记录一下。

# 与取余的关系

1、求整数商：c=a/b;
2、计算模或者余数：r=a-c*b。

　　只有在负数时有区别。

第一步：求整数商c，如进行求模运算c = -2（向负无穷方向舍入），求余c = -1（向0方向舍入）；

第二步：计算模和余数的公式相同，但因c的值不同，求模时r = 1，求余时r = -3。

# 四则运算

```
(a + b) % p = (a % p + b % p) % p
(a - b) % p = (a % p - b % p) % p
(a * b) % p = (a % p * b % p) % p
a ^ b % p = ((a % p)^b) % p
```

结合律：

<pre>
((a+b) % p + c) % p = (a + (b+c) % p) % p
((a*b) % p * c)% p = (a * (b*c) % p) % p
</pre>

分配律：

<pre>
(a+b) % p = ( a % p + b % p ) % p
((a +b)% p * c) % p = ((a * c) % p + (b * c) % p) % p
</pre>

重要定理：

<pre>
若a≡b (% p)，则对于任意的c，都有(a + c) ≡ (b + c) (%p)；
若a≡b (% p)，则对于任意的c，都有(a * c) ≡ (b * c) (%p)；
若a≡b (% p)，c≡d (% p)，则 (a + c) ≡ (b + d) (%p)，(a - c) ≡ (b - d) (%p)，
(a * c) ≡ (b * d) (%p)，(a / c) ≡ (b / d) (%p)； 
</pre>
