---
title: Shell语法学习
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Programming in Shell
---
# Shell语法学习笔记

　　使用help可以查看bash有哪些内建命令。

## 数据类型

　　Shell中基本类型只有整数和字符串，没有布尔量和浮点数,也不支持浮点运算（需要依靠bc或者awk）。

　　复杂数据类型有数组。

　　另外使用Bash内置的`declare`命令可以声明Map。

```sh
# 数组
arr=("value1" 2 3)
# Map
declare -A map=(["key1"]="value1" [2]="value2")
```

## 退出码（Exit Code）

　　Shell中语句返回0表示执行成功，非0表示执行失败。

## 操作符

### .和source

　　`.`和`source`的用法是相同的，即将指定的其他Shell脚本的内容替换并执行。

```sh
. hehe.sh
source hehe.sh
```

### <命令1> && <命令2>

　　命令1返回0则执行命令2，否则不执行命令2。

### <命令1> || <命令2>

　　命令1返回非0则执行命令2，否则不执行命令2。

### <命令1> ; <命令2>

　　命令1执行完后执行命令2。

### nohup和&[^5]

　　&表示后台运行，不改变进程的标准输出流的定向。如果会话结束，进程会接收到SIGHUP信号而结束。

　　nohup表示进程转到后台，标准输出流定向到\$PWD/nohup.out或者\$HOME/nohup.out，并且进程忽略进程结束的SIGHUP信号。

　　使用`nohup <command> &`可以让进程在后台运行而不受会话结束影响。

### export关键字

　　不用export，定义的就是普通变量。即使修改了环境变量，子脚本也不会获得修改后的值。

　　用export，定义的变量就变成环境变量。修改或者添加的的环境变量会被子脚本获得。

/etc/profile中直接使用

```sh
PATH=$PATH:新路径
```
就可以，不需要export。

### 各种括号用法

如下[^4]：

#### { <命令1>;<命令2>;……; }

　　当前shell从左到右执行命令，退出码为最后一个命令的退出码。注意每个命令后有个分号，内侧左右有空格。

#### (<命令1>;<命令2>;……)

　　新开一个子shell从左到右执行命令，退出码为最后一个命令的退出码。注意每个命令之间有分号就可以了，内侧左右不必有空格。

#### $(<命令1>;<命令2>;……)

　　获得这些命令的标准输出。这些命令必须能运行结束。

```sh
hehe=$(ping -c 1 <不可达地址>)
echo $?
#返回1
```

#### $((表达式))、for((表达式))和if((表达式))

　　C语言风格计算。

```sh
echo $((1+1))
#输出2

echo $((16#5f))
#输出95

a=1
echo $((++a))
#输出2

for((i=0;i<5;i++));do echo "hehe";done
#输出5个hehe

i=5
if((i<6));then echo "hehe";fi
#输出hehe
```

#### if [表达式]和if test 表达式

　　两者是等同的。

```sh
i=5
if [ $i -lt 6 -a $i -gt 2 ];then echo "hehe";fi
if [ $i -lt 6 ]&&[ $i -gt 2 ];then echo "hehe";fi
if test $i -lt 6 -a $i -gt 2 ;then echo "hehe";fi
```
　　可用的类C比较运算符只有`==`、`!=`、`\<`、`\>`，只用于字符串比较。

　　整数只能用`-gt`、`-lt`、`-eq`这些。

　　-a和-o表示逻辑与与逻辑或。

#### if [[表达式]]

　　[[ ]]是 bash 程序语言的关键字。并不是一个命令，[[ ]] 结构比[ ]结构更加通用。在[[和]]之间所有的字符都不会发生文件名扩展或者单词分割，但是会发生参数扩展和命令替换。

　　&&、||、<和> 操作符能够正常存在于[[ ]]条件判断结构中，例如`if [[ $a != 1 && $a != 2 ]]`。

## 避免重复包含

如下[^3]：

```sh
_sourced_="__sourced_$$__"

echo "Flag variable $_sourced_=${!_sourced_}"

if [ -z "${!_sourced_}" ]; then
    eval "$_sourced_=1"
    echo "It is the first time to source script"
else
    echo "The script have been sourced"
fi
```
## 重定向

### Here Document

　　Here Document如下[^2]所示，将定位符下一行开始的文本内容传递给标准输入流：
　　
```sh
command << delimiter
    document
delimiter
```

> - 结尾的delimiter 一定要顶格写，前面不能有任何字符，后面也不能有任何字符，包括空格和 tab 缩进。
> - 开始的delimiter前后的空格会被忽略掉。

　　例如：

```sh
cat <<EOF1; cat <<EOF2
Hi,
EOF1
Helene.
EOF2
```

　　另外，document里面`$`开头的变量会在进入标准输入流前先被当前环境的变量替换，如果要原样进入标准输入流，需要在定位符（delimiter）前添加反斜杠`\`[^1]。

```sh
id=foo
cat >run_pos2bed3.sh << EOF
ls 2*/peaks.txt | while read i^d;
 <o echo $id done;
E>OF
```

```sh
id=foo
cat >run_pos2bed3.sh << \EOF
ls 2*/peaks.txt | while read i^d;
 <o echo $id done;
E>OF
```



## 参考

[^1]: [Bash Reference Manual]( https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Here-Documents )

[^2]: [Shell 输入/输出重定向]( https://www.runoob.com/linux/linux-shell-io-redirections.html )

[^3]: <http://kodango.com/avoid-repeated-source-in-shell>
[^4]: <https://blog.csdn.net/taiyang1987912/article/details/39551385>

[^5]: <https://blog.csdn.net/u011095110/article/details/78666833>
