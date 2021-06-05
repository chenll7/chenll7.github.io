---
title: 命令使用学习笔记之tar
date: '2020-11-01 11:36:11'
updated: '2020-11-07 10:37:05'
categories:
  - 2 Shell
---
# 命令使用学习笔记之tar

## Excluding Some Files[^1]

- `--exclude=<pattern>`: ignore files that match the pattern.

- `--exclude-from=<file>`、`-X file`: ignore files that match the patterns listed in file.
- `--exclude-vcs-ignores`: ignore patterns from the following files: `cvsignore`, `.gitignore`, `.bzrignore`, or `.hgignore`.
- `--exclude-ignore=<file>`, `--exclude-ignore-recursive=<file>`: ignore files that match the patterns listed in file in the directory if a directory contains this file.
- `--exclude-vcs`: exclude files and directories used by some version control systems like `.git`.
- `--exclude-backups`: ignore files that match the pattern like `.#*`, `*~`, `#*#`.
- `--exclude-caches`, `--exclude-caches-under`, `--exclude-caches-all`: ignore directories containing `CACHEDIR.TAG` file.
- `--exclude-tag=<file>`, `--exclude-tag-under=<file>`, `--exclude-tag-all=<file>`: ignore directories containing the specified file.

## References

[^1]:[6.4 Excluding Some Files](https://www.gnu.org/software/tar/manual/html_node/exclude.html)
