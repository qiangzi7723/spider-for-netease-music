### 使用

`npm install`

建立数据表
修改数据库配置
配置enckey

建议使用`devtool`运行，调试较为方便。数据库的配置在`config`中。对应的表结构也在里面。

node版本问题 async报错

### 注意

本爬虫不部署到服务器上，在本地执行。所以如果需要部署到服务器上还需要自己手动配置。

### 新增特性

- 新增爬取过程中网络出错时智能提醒

### Beta版本思路

爬取歌手页面的所有歌手，根据歌手索引当前歌手热度前10的歌进行评论分析。

### 实现

观察到网易云音乐的内容都是由JS动态的插入iframe中的，所以需要一个能够执行JS的库。~~目前选用的方案是PhantomJs结合Node。~~

~~Node起一个子进程让PhantomJs负责解析页面。~~

采取Nightmare来实现iframe部分的处理。

### 防屏蔽

- 更换IP
- 配置多组USER-AGENT以及encSecKey，随机更改
- 伪装成为百度爬虫

第一次跟第二次都是爬取了1万多数据后服务端开始返回503，到了后来返503的情况越来越频繁。所以尝试了更换本地的ip来进行爬取。

刚刚尝试更换IP，但是数据库马上挂掉了，原因不明。

另外发现晚上进行数据爬取不会被封禁，连IP都不需要更换。

### 错误日志

```
Uncaught (in promise) 
Object {
    message: "navigation error", 
    code: -7, 
    details: "Navigation timed out after 30000 ms", 
    url: "https://music.163.com/#/artist?id=7672"
    }
```
nightmare层报错，由于网络问题导致该次请求不成功，没有处理timeout抛出的错误。已经处理

```
Cannot read property 'innerHTML' of null ESNO 请求超时 即将重新请求
```
有可能是当前歌手对应的页面404，已经丢失或者更新。已经处理

### 环境配置