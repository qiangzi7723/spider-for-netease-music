const agent = require('superagent');
const cheerio=require('cheerio');
const url='https://music.163.com/discover/artist/cat?id=1001&initial=65';

agent.get(url).then(res=>{
    const $=cheerio.load(res.text);
    const elms=$('li .s-fc0');
    console.log(elms.length);
    elms.each(function(i,elm){
        console.log($(this).text());
    })
})