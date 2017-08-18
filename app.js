const Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
const nightmare = Nightmare({
    electronPath: require('./node_modules/electron')
});
const async = require('async');
const agent = require('superagent');
const cheerio = require('cheerio');

const singer = [];
const controlIframe = () => {
    nightmare.goto('https://music.163.com/#/discover/artist/cat?id=1001&initial=65')
        .enterIFrame('#g_iframe')
        .evaluate(function () {
            const content = document.querySelector("#m-artist-box").innerHTML;
            return content;
        })
        .end()
        .then(res => {
            const $ = cheerio.load(res);
            $('li .s-fc0').each(function () {
                const href = $(this).attr('href');
                console.log(href);
            })
        });
}

controlIframe();