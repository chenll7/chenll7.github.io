---
title: How To Delete a User Completely
date: '2020-11-01 11:36:12'
updated: '2020-11-07 10:37:05'
categories:
  - 3 Linux
---
# How To Delete a User Completely

```sh
# Delete the user from file /etc/passwd and delete home folder and the mail folder of the user.
userdel -r <user to be deleted>
# Delelte the primary group (defalut group) of the deleted user.
groupdel <user
```

