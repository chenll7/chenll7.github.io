---
title: Electron Basics
date: '2020-11-01 11:36:10'
updated: '2020-11-01 12:23:05'
categories:
  - 2. Node.js-Electron
---
# Electron Basics

## How to Solve the Problem of Downloading Failure while Using `electron-builder`

Encountered the following problem while using `electron-builder`:

```sh
  • downloading     url=https://github.com/electron/electron/releases/download/v8.2.3/electron-v8.2.3-win32-x64.zip size=71 MB parts=8
  • retrying        attempt=1
  • retrying        attempt=2
  • retrying        attempt=3
  ⨯ part download request failed with status code 403
github.com/develar/app-builder/pkg/download.(*Part).doRequest
        /Volumes/data/Documents/app-builder/pkg/download/Part.go:126
github.com/develar/app-builder/pkg/download.(*Part).download
        /Volumes/data/Documents/app-builder/pkg/download/Part.go:67
github.com/develar/app-builder/pkg/download.(*Downloader).DownloadResolved.func1.1
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:107
github.com/develar/app-builder/pkg/util.MapAsyncConcurrency.func2
        /Volumes/data/Documents/app-builder/pkg/util/async.go:68
runtime.goexit
        /usr/local/Cellar/go/1.12.7/libexec/src/runtime/asm_amd64.s:1337  
```

Just download the file manually and move it to this path `%USERPROFILE%\AppData\Local\electron\Cache`.

## How to Solve the Problem of `Error: Electron failed to install correctly, please delete node_modules/electron and try installing again`

Sometimes it is due to failure downloading of electron executor as a result of poor internet connection to Github in China. Solve it as follow:[^2]

```sh
# Use mirror source.
export ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
# Or
npm config set electron_mirror https://cdn.npm.taobao.org/dist/electron/
# Or
yarn config set electron_mirror https://cdn.npm.taobao.org/dist/electron/
```

## How to Solve the Problem of Compiling Error of package `sqlite3` with `electron-rebuild`

While re-compiling sqlite3 with `electron-rebuild`, errors occured as the following:

```
× Rebuild Failed

An unhandled error occurred inside electron-rebuild
Building the projects in this solution one at a time. To enable parallel build, please add the "/m" switch.
  unpack_sqlite_dep
  sqlite3.c
  win_delay_load_hook.cc
  sqlite3.vcxproj -> D:\Bear\bear-campsite\code-private\20200418-BearUnifiedMgr\bear_unified_mgr\packages\plugin-contact_mgr\node_modules\sqlite3\
build\Release\\sqlite3.lib
  backup.cc
  database.cc
  node_sqlite3.cc
  statement.cc
  win_delay_load_hook.cc
c:\users\bear\.electron-gyp\8.2.3\include\node\v8.h(8923): warning C4996: 'v8::MicrotasksCompletedCallback': Use *WithData version. (compiling sou
rce file ..\src\statement.cc) [<PROJECT_PATH>\node_module
s\sqlite3\build\node_sqlite3.vcxproj]
```

I solved it as the follows:

```sh
npm install windows-build-tools -g
cd ./node_modules/sqlite3
node-gyp rebuild --target=<ELECTRON_VERSION> --arch=x64 --target_platform=win32 --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/electron-v<ELECTRON_VERSION>-win32-ia32
```

## Why `remote` module is not recommended?

Because it is slow and sometimes confusing.[^4]You'd better use `ipcMain` and `ipcRender`.

## References

[^1]: <https://github.com/electron-userland/electron-builder/issues/3115>
[^2]: <https://www.cnblogs.com/Zev_Fung/p/12421858.html>
[^3]: <https://blog.csdn.net/zoepriselife316/article/details/89954383>
[^4]: [Electron’s ‘remote’ module considered harmful](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)
