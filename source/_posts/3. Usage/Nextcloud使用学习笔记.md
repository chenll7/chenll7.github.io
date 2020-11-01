---
title: Nextcloud使用学习笔记
date: '2020-11-01 11:36:11'
updated: '2020-11-01 12:23:05'
categories:
  - 3. Usage
---
# Nextcloud使用学习笔记

　　Nextcloud是GPL协议开源的自建网盘软件

　　使用Docker来在Linux系统下部署Nextcloud服务端便于迁移。

　　Nextcloud服务端在运行时有三个容器，分别是运行于Apache和php解释器中的Nexcloud应用，MariaDB数据库和Nginx服务器。其中的Nginx服务器作用是Nextcloud应用前的反向代理，以将http转化为https，证书来自于Let‘s Encrypt，因此需要有解析到宿主机的域名。如果不需要在数据传输过程中加密，可以不需要这个反向代理。

　　使用Docker Compose管理这些容器，`docker-compose.yml`的内容为：

```yaml
version: '3'

services:
  db:
    image: mariadb
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    restart: always
    volumes:
      - ./db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=<密码>
    env_file:
      - db.env

  app:
    image: nextcloud:apache
    restart: always
    volumes:
      - ./nextcloud_data:/var/www/html
    environment:
      - MYSQL_HOST=db
    ports:
      - <以HTTP协议访问Nextcloud应用的端口>:80
    env_file:
      - db.env
    depends_on:
      - db

  proxy:
    image: nginx:1.15-alpine
    restart: always
    ports:
      - <以HTTPS协议访问Nextcloud应用的端口>:443
    volumes:
      - ../letsencrypt/<证书所在目录>:/etc/nginx/certs:ro
      - ./nginx-conf:/etc/nginx/conf.d:ro
```

db.env文件的内容为：

```ini
MYSQL_PASSWORD=<密码>
MYSQL_DATABASE=nextcloud
MYSQL_USER=nextcloud
```

可以注意到，`docker-compose.yml`中把Nextcloud应用的http端口暴露出来了，这本来不应该暴露出来，而是给Nginx服务器用的，这里是为了调试用。生产时应该用防火墙封上，或者修改`docker-compose.yml`停止暴露http端口。

　　Nextcloud应用应该持久化的数据（包括配置文件和存储的文档、图片等）存储于`/var/www/html`和MariaDB数据库，所以把Nextcloud应用app的`/var/www/html`目录和MariaDB数据库db的`/var/lib/mysql`单独挂载到宿主机上。

　　对于Nginx服务器，将HTTPS需要用到的从Let's Encrypt申请的证书挂载到`/etc/nginx/certs`目录下（我这里是`<域名>.key`和`fullchain.cer`）。将Nginx服务器的配置文件`app.conf`放在当前目录的``nginx-conf`目录下，这个目录挂载为容器下的`/etc/nginx/conf.d`目录，容器启动时会读取这个配置文件。

　　`app.conf`的内容为：

```nginx
server {
    listen 443 ssl;
    server_name  <域名>;

    access_log /var/log/nginx/fbcll.top.access.log;
    error_log /var/log/nginx/fbcll.top.error.log;
    ssl_certificate          /etc/nginx/certs/fullchain.cer;
    ssl_certificate_key      /etc/nginx/certs/<域名>.key;

    ssl_session_timeout  5m;

    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;
    client_max_body_size 0;
    underscores_in_headers on;
    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Front-End-Https on;

        proxy_headers_hash_max_size 512;
        proxy_headers_hash_bucket_size 64;

        proxy_buffering off;
        proxy_redirect off;
        proxy_max_temp_file_size 0;
    }
}
```

启动后可以访问http端口，但是无法访问https端口。

　　参考[《Setup NextCloud Server with Nginx SSL Reverse-Proxy and Apache2 Backend》](https://felixbreuer.me/tutorial/Setup-NextCloud-FrontEnd-Nginx-SSL-Backend-Apache2.html)的做法，在Nextcloud应用的配置文件（路径为`./nextcloud_data/config/config.php`）中添加以下内容（根据实际情况修改）：

```php
//...
'trusted_domains' =>
array (
    0 => '127.0.0.1:8080',
    1 => 'cloud.example.com',
),
'overwritehost' => 'cloud.example.com',
'overwriteprotocol' => 'https',
'overwritewebroot' => '/',
'overwrite.cli.url' => 'https://cloud.example.com/',
'htaccess.RewriteBase' => '/',
'trusted_proxies' => ['127.0.0.1'],
//...
```

就可以用https访问了。
