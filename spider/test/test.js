const Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
const nightmare = Nightmare({
    electronPath: require('./node_modules/electron'),
    // show:true
    // webPreferences: {
    //     partition: 'nopersist'
    // }
});
const async = require('async');
const agent = require('superagent');
const cheerio = require('cheerio');
const query = require('./mysql');
const {
    songConfig
} = require('./config');
const moment = require('moment');
const {
    limitLength
} = require('./util');
const request = require('request');

const common = 'https://music.163.com/weapi/v1/resource/comments/R_SO_4_';

const collectSinger = () => {
    console.log(moment().format());
    nightmare.resetFrame()
        .goto('https://music.163.com/#/artist?id=1876', {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'music.163.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
            'Connection': 'keep-alive',
            'Origin': 'https://music.163.com'
        }) // 进入歌曲列表页面
        .enterIFrame('#g_iframe')
        .evaluate(function () {
            const content = document.querySelector("#artist-top50").innerHTML;
            return content;
        })
        .then(res => {
            console.log(moment().format());
            const $ = cheerio.load(res);
            const song = $('.txt a');
            limitLength(song, 10); // 最多获取N首歌曲的评论
            async.mapLimit(song, 5, (item, cbItem) => {
                // 遍历前N首歌曲 并且获取评论数量
                const href = $(item).attr('href').split('id=')[1];
                const title = $(item).text();
                console.log(common + href + '?csrf_token=');
                // const req = {
                //     url:common + href + '?csrf_token=',
                //     method: 'post',
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded',
                //         'Host': 'music.163.com',
                //         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                //         'Connection': 'keep-alive',
                //         'Origin': 'https://music.163.com'
                //     },
                //     form: songConfig.key
                // }
                // request(req, function (err, httpResponse, body) {
                //     console.log(JSON.parse(body));
                //     cbItem();
                // })
                agent.post(common + href + '?csrf_token=')
                    // .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36')
                    // .set('Host','music.163.com')
                    // .set('Cookie','JSESSIONID-WYYY=XNtxV4a8Yqs3gDrc2ZIMzbIrxR2sj3ombmO8d7rAS6KcHkp%2FO86nDjcf6fKRR1oiwXNd5p487WiMONh6kM%2Fd63A7taaXp%2BvFgv0YeeJkdM9AmtJuou3lvVuilmElaKCT%5Cm9cbmawtogdTd32hnDa%2FDfvVAWlnoqqxf93i1Q0bjk%2B3A5b%3A1503190500270; _iuqxldmzr_=32; usertrack=c+5+hlh1Ablj93dxBWcQAg==; _ntes_nnid=ca398b26f61997a5ca2931acd4e9c613,1484406626518; _ntes_nuid=ca398b26f61997a5ca2931acd4e9c613; mail_psc_fingerprint=b7de956f6d0348b9084318d642061d0f; __utma=94650624.579250734.1484406627.1484406627.1487428120.2; __utmz=94650624.1484406627.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; vjuids=231597936.15ad3b08063.0.5f0bb7d464bf8; vjlast=1489610244.1499273549.23; __s_=1; vinfo_n_f_l_n3=6d7ea9e0c27752bc.1.1.1489610249384.1489610314493.1499274091068; __oc_uuid=454de1f0-6623-11e7-9fae-edee33ed515f; P_INFO=m18826139660@163.com|1501862906|1|study|00&99|null&null&null#gud&440100#10#0#0|188660&1||18826139660@163.com; playerid=22777257; usertrack=c+5+hlh1Ablj93dxBWcQAg==; _ntes_nnid=ca398b26f61997a5ca2931acd4e9c613,1484406626518; _ntes_nuid=ca398b26f61997a5ca2931acd4e9c613; mail_psc_fingerprint=b7de956f6d0348b9084318d642061d0f; __utma=94650624.579250734.1484406627.1484406627.1487428120.2; __utmz=94650624.1484406627.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; vjuids=231597936.15ad3b08063.0.5f0bb7d464bf8; vjlast=1489610244.1499273549.23; __s_=1; vinfo_n_f_l_n3=6d7ea9e0c27752bc.1.1.1489610249384.1489610314493.1499274091068; __oc_uuid=454de1f0-6623-11e7-9fae-edee33ed515f; P_INFO=m18826139660@163.com|1501862906|1|study|00&99|null&null&null#gud&440100#10#0#0|188660&1||18826139660@163.com; JSESSIONID-WYYY=XNtxV4a8Yqs3gDrc2ZIMzbIrxR2sj3ombmO8d7rAS6KcHkp%2FO86nDjcf6fKRR1oiwXNd5p487WiMONh6kM%2Fd63A7taaXp%2BvFgv0YeeJkdM9AmtJuou3lvVuilmElaKCT%5Cm9cbmawtogdTd32hnDa%2FDfvVAWlnoqqxf93i1Q0bjk%2B3A5b%3A1503190500270; _iuqxldmzr_=32; usertrack=c+5+hlh1Ablj93dxBWcQAg==; _ntes_nnid=ca398b26f61997a5ca2931acd4e9c613,1484406626518; _ntes_nuid=ca398b26f61997a5ca2931acd4e9c613; mail_psc_fingerprint=b7de956f6d0348b9084318d642061d0f; __utma=94650624.579250734.1484406627.1484406627.1487428120.2; __utmz=94650624.1484406627.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; vjuids=231597936.15ad3b08063.0.5f0bb7d464bf8; vjlast=1489610244.1499273549.23; __s_=1; vinfo_n_f_l_n3=6d7ea9e0c27752bc.1.1.1489610249384.1489610314493.1499274091068; __oc_uuid=454de1f0-6623-11e7-9fae-edee33ed515f; P_INFO=m18826139660@163.com|1501862906|1|study|00&99|null&null&null#gud&440100#10#0#0|188660&1||18826139660@163.com; playerid=22777257')
                    // .send({
                    //     encSecKey: '2af4ca51b906def2e80755a34450db64e8a34f038ffa7ee66ae4c50fbaacc785eddcc1a63222928af3814c355f20b7f8d4e4b05f26879087acd1f8a4da79adaa4a59e3efb54c135017d7f94f7514603e208b0178f547f436c9ca11a3f45e27876c81c3f0a5d3a82854b9d39fdee0ac1b16ecd23503908595fc48359e0811f6d6',
                    //     params: 'DQU/eyfHyqpTa40dLoNsxkRxCEmEsIgzAgKEYce7d5o78+o4DrdquhuTE5/h5PWqI027kSWd4Y1c9/h6mQFX8J9KiGI0zhV7hb6F7JzXjmg2wtky3SXDoXDn2IYKQnoF4mSXfjGtJdL9kA0KmJvNow=='
                    // })
                    .send('encSecKey=2af4ca51b906def2e80755a34450db64e8a34f038ffa7ee66ae4c50fbaacc785eddcc1a63222928af3814c355f20b7f8d4e4b05f26879087acd1f8a4da79adaa4a59e3efb54c135017d7f94f7514603e208b0178f547f436c9ca11a3f45e27876c81c3f0a5d3a82854b9d39fdee0ac1b16ecd23503908595fc48359e0811f6d6&params=DQU/eyfHyqpTa40dLoNsxkRxCEmEsIgzAgKEYce7d5o78+o4DrdquhuTE5/h5PWqI027kSWd4Y1c9/h6mQFX8J9KiGI0zhV7hb6F7JzXjmg2wtky3SXDoXDn2IYKQnoF4mSXfjGtJdL9kA0KmJvNow==')
                    .end((err, res) => {
                        console.log(err);
                        console.log(res);

                    })
                // nightmare.goto(songConfig.common + href)
                // .then(cbItem)
                // .then(() => {
                //     if (!flag) {
                //         flag = true;
                //         nightmare.resetFrame()
                //             .enterIFrame('#g_iframe')
                //             .evaluate(function () {
                //                 const comment = document.querySelector(".j-flag").innerText;
                //                 return comment;
                //             })
                //             .then(res => {
                //                 console.log('时间2 ', new Date(), res);
                //                 // query('insert into song(title,comment,url,name,singer) values(?,?,?,?,?)', [title, res, href, singer.name, index], (err, response) => {
                //                 //     if (err) {
                //                 //         // 说明歌曲重复 进行update操作
                //                 //         query('update song set title=?,comment=?,name=?,singer=? where url=?', [title, res, singer.name, index, href], () => {

                //                 //         });
                //                 //     }
                //                 // 插入数据完毕
                //                 flag = false;
                //                 cbItem();
                //                 // })
                //             })
                //     }
                // })

            }, () => {
                console.log('时间 ', moment().format());
            })
        })
}
collectSinger();