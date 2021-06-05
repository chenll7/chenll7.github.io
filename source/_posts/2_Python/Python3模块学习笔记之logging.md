---
title: Python3模块学习笔记之logging
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Python
---
# Python3模块学习笔记之logging

## 使用默认日志对象

```python3
import logging
logging.basicConfig(level=logging.WARN, format="%(levelname)s:%(message)s")
# DEBUG级别
logging.debug('Debugging')
# INFO级别
logging.info('Finished')
# WARN级别/WARNING级别
logging.warning('Warning exists')
# ERROR级别
logging.error('Error Occurred')
# CRITICAL级别/FATAL级别
logging.critical('Critical Something')
```

## 使用自定义日志对象

```python3
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setFormatter(logging.Formatter('%(levelname)s %(asctime)s %(name)s|%(message)s'))
logger.addHandler(console_handler)
logger.debug('hehe')
```
