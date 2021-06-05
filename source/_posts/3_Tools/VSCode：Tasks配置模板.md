---
title: VSCode：Tasks配置模板
date: '2020-11-01 11:36:12'
updated: '2020-11-01 12:24:47'
categories:
  - 3 Tools
---
```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Deploy",
            "type": "shell",
            "linux": {
                "command": "clear && python3 deploy.py"
            }
        },
        //Ctrl+Shift+b就可以执行的生成任务
        {
            "label": "Build",
            "type": "shell",
            "linux": {
                "command": "echo haha"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ],
    "options": {
        "cwd": "${workspaceFolder}"
    },
    "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "dedicated",
        "showReuseMessage": true
    },
}
```
