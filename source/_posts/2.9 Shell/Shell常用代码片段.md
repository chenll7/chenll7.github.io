---
title: Shell常用代码片段
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:24:47'
categories:
  - 2.9 Shell
---
# Shell常用代码片段

## 设置代理

```sh
export http_proxy=http://localhost:1080
export https_proxy=http://localhost:1080
```

## 遇到退出值为非0语句脚本自动结束

```sh
set -e
```

## 打印工作目录

```sh
pwd
# 或者
echo $PWD
```

## 循环

```sh
for i in $(seq 0 4);do echo $i;done
for ((i=0;i<5;i++));do echo $i;done  
for i in {0..4};do echo $i;done
```

## 遍历数组

```sh
arr=("value1" 2)
# 遍历值
for value in ${arr[@]};do
    echo $value
done
# 遍历下标值
for idx in ${!arr[@]};do
    echo ${arr[$idx]}
done
```

## 遍历Map

```sh
declare -A map=(["key1"]="value1" [2]="value2")
# 遍历值
for value in ${map[@]};do
    echo $value
done
# 遍历键值
for key in ${!map[@]};do
    echo ${map[$key]}
done
```

## 递归遍历目录

```sh
traversal(){
    # 修改内部域分隔符（Internal Field Seprator）为\n，避免带空格的文件名被误认为两个文件
    local old_IFS=$IFS
    IFS=$'\n'
    traversal_rec .
    IFS=$old_IFS
}

traversal_rec() {
	for file in `ls $1`
	do
        # 判断是否是目录，是目录则递归
		if [ -d "$1/$file" ];
		then
			traversal_rec "$1/$file"
		else
            if [ ${file##*.} == 'md' ];then
                process_markdown "$1/$file"
            fi
		fi
	done
}
```

## 如果文件里不存在某行，则向文件里添加该行

```sh
grep 'alias sudo="sudo "' /etc/bash.bashrc || echo 'alias sudo="sudo "' | sudo tee -a /etc/bash.bashrc
```


## 脚本所在目录

```sh
# 相对路径或者绝对路径
SCRIPT_DIR=$(dirname "$0")
# 绝对路径
SCRIPT_DIR=$(cd "$(dirname \"$0\")";pwd)
```

## 判断当前文件是否被直接调用执行（而不是source方式执行）

```sh
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
```

## Linux下终端输出有颜色的字

```sh
prt_color(){
    case $1 in
    "green" )#打印绿色字符串
        echo -e "\033[32m""$2""\033[0m"
        ;;
    "azure" )#打印天蓝色字符串
        echo -e "\033[36m""$2""\033[0m"
        ;;
    "yellow")#打印黄色字符串
        echo -e "\033[33m""$2""\033[0m"
        ;;
    "red"   )#打印红色字符串
        echo -e "\033[31m""$2""\033[0m"
        ;;
    esac
}
```
