---
title: 命令使用学习笔记之getopt
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Programming in Shell
---
# 命令使用学习笔记之getopt

```sh
ARGS=`getopt -o u:p: --long username:,password:,interval,force -- "$@"` || exit 1
# 参数重排
eval set -- "${ARGS}"
# 读取参数
while true;do
    case "$1" in
        -u|--username)
            printf "Username is '$2'.\n";
            export USERNAME=$2
            # 参数左移两位
            shift 2
            ;;
        -p|--password)
            printf "Password is '$2'.\n";
            export PASSWD=$2
            shift 2
            ;;
        --interval)
            printf "Interval mode.\n";
            INTERVAL_MODE=1
            shift
            ;;
        --force)
            printf "Force mode (if online IP is full, force them to be offline ).\n";
            FORCE_MODE=1
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Error!"
            exit 1
            ;;
    esac
done

if [ -n "$USERNAME" -a -n "$PASSWD" ];then
    if [ $INTERVAL_MODE -eq 1 ];then
        while true;do
            login
            printf "Sleep 180s ...\n"
            sleep 180s
        done
    else
        login
    fi
else
    printf "Warning: username or password is not set.Terminating ...\n"
fi

```

