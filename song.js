const Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
const nightmare = Nightmare({
    electronPath: require('./node_modules/electron'),
});
const async = require('async');
const agent = require('superagent');
const cheerio = require('cheerio');
const query = require('./mysql');
const moment = require('moment');
const {
    singerConfig,
    songConfig,
    key
} = require('./config');
const {
    limitLength,
    splitId
} = require('./util');
const request = require('request');


const collectSong = () => {
    let index = 5310;
    async.whilst(() => {
        return index <= 31252;
    }, (cb) => {
        // 从数据库中获取歌手姓名以及URL 然后开始遍历歌曲
        query('select name,url from singer where singer=?', [index], (err, res) => {
            if (!err) {
                const singer = {
                    name: res[0].name,
                    url: res[0].url.trim()
                }
                nightmare.resetFrame()
                    .goto(songConfig.common + singer.url, {
                        'Host': 'music.163.com',
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
                    }) // 进入歌曲列表页面
                    .enterIFrame('#g_iframe')
                    .evaluate(function () {
                        const content = document.querySelector("#artist-top50").innerHTML;
                        return content;
                    })
                    .then(res => {
                        const $ = cheerio.load(res);
                        const song = $('.txt a');
                        limitLength(song, 10); // 最多获取N首歌曲的评论
                        async.mapLimit(song, 1, (item, cbItem) => { // 并发数量N
                            // 遍历前N首歌曲 并且获取评论数量
                            const href = $(item).attr('href');
                            const id = splitId(href);
                            const title = $(item).text();
                            const url = songConfig.comment + id + '?csrf_token=';
                            const req = {
                                url,
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
                                },
                                form: songConfig.key
                            }
                            request(req, (err, res, body) => {
                                if (body) {
                                    const content = JSON.parse(body);
                                    const commet = content.total;
                                    query('insert into song(title,comment,url,name,singer) values(?,?,?,?,?)', [title, commet, href, singer.name, index], (err, response) => {
                                        if (err) {
                                            // 说明歌曲重复 进行update操作
                                            query('update song set title=?,comment=?,name=?,singer=? where url=?', [title, commet, singer.name, index, href], () => {});
                                        }
                                        // 插入数据完毕
                                        cbItem();
                                    })
                                } else {
                                    cbItem();
                                }
                            })
                        }, () => {
                            console.log('歌手 ' + singer.name + ' 抓取完毕');
                            index++;
                            cb();
                        })
                    })
                    .catch(err=>{
                        // goto超时处理
                        console.log(err,singer.name+' 请求超时 即将重新请求');
                        cb();
                    })
            } else {
                // 查询错误处理
                console.log(err, 'singer ID ' + index);
                index++;
                cb();
            }
        })
    })
}
collectSong();