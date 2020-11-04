---
title: Python3模块学习笔记之datetime
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 2.7. Python
---
# Python3模块学习笔记之datetime

datetime模块下面有几个常用的类：datetime、date、time、timedelta。

## 参考

- <https://blog.csdn.net/shomy_liu/article/details/44141483>

# date

```python
from datetime import date,timedelta
dToday=date.today()
dYesterday=date.today()+timedelta(days=-1)
dTommorow=date.today()+timedelta(days=1)
```

# datetime

```python
from datetime import datetime,timedelta
dtNow=datetime.now()#datetime.today()
dt6HoursLater=datetime.today()+timedelta(seconds=21600)
```

# strftime

　　貌似date、time、datetime都有strftime函数用来获取格式化字符串，其中需要注意的点：

格式符|说明
-|-
%a|星期的英文单词的缩写：如星期一，则返回Mon
%A|星期的英文单词的全拼：如星期一，返回Monday
%b|月份的英文单词的缩写：如一月，则返回Jan
%B|月份的引文单词的缩写：如一月，则返回January
%c|返回datetime的字符串表示，如03/08/15 23:01:26
%d|返回的是当前时间是当前月的第几天
%f|微秒的表示，范围: [0,999999]
%H|以24小时制表示当前小时
%I|以12小时制表示当前小时
%j|返回当天是当年的第几天,范围[001,366]
%m|返回月份,范围[0,12]
%M|返回分钟数，范围[0,59]
%P|返回是上午还是下午–AM or PM
%S|返回秒数，范围[0,61]
%U|返回当周是当年的第几周，以周日为第一天
%W|在一年中的周数，1.1所在的那周为第一周，一周从周一开始周日结束
%w|当天在当周的天数，范围为[0, 6]，0表示星期天
%x|日期的字符串表示：03/08/15
%X|时间的字符串表示：23:22:08
%y|两个数字表示的年份，如15
%Y|四个数字表示的年份，如2015
%z|与utc时间的间隔（如果是本地时间，返回空字符串）
%Z|时区名称（如果是本地时间，返回空字符串）

- %Y.%m.%d：年月日
