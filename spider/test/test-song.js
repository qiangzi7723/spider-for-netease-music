const agent = require('superagent');
const cheerio = require('cheerio');
const url = 'https://music.163.com/artist?id=6452';
const {
    limitLength,
    splitId,
    notify
} = require('../util');

agent.get(url)
    .then((suc, fail) => {
        const $=cheerio.load(suc.text);
        const content=$('#song-list-pre-cache textarea');
        const contentObj=JSON.parse(content.text());
        limitLength(contentObj,10);
        console.log(contentObj);
    })
    .catch((e)=>{
        console.log(e);
    })