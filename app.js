// const agent = require('superagent');
// const cheerio = require('cheerio');
var page = require('webpage').create();

page.open('https://music.163.com/#/discover/artist/cat?id=1001&initial=65', function (status) {
    console.log(status);
    var content = page.evaluate(function () {
        return document.getElementById('g_iframe');
    });
    console.log(content);
    phantom.exit();
})