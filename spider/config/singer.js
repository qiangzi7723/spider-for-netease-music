const singerConfig = {
    common: 'https://music.163.com/#/discover/artist/cat',
    list: [{
        title: '华语男歌手',
        category: '华语',
        id: '1001'
    }, {
        title: '华语女歌手',
        category: '华语',
        id: '1002'
    }, {
        title: '华语组合/乐队',
        category: '华语',
        id: '1003'
    }, {
        title: '欧美男歌手',
        category: '欧美',
        id: '2001'
    }, {
        title: '欧美女歌手',
        category: '欧美',
        id: '2002'
    }, {
        title: '欧美组合/乐队',
        category: '欧美',
        id: '2003'
    }, {
        title: '日本男歌手',
        category: '日本',
        id: '6001'
    }, {
        title: '日本女歌手',
        category: '日本',
        id: '6002'
    }, {
        title: '日本组合/乐队',
        category: '日本',
        id: '6003'
    }, {
        title: '韩国男歌手',
        category: '韩国',
        id: '7001'
    }, {
        title: '韩国女歌手',
        category: '韩国',
        id: '7002'
    }, {
        title: '韩国组合/乐队',
        category: '韩国',
        id: '7003'
    }, {
        title: '其他男歌手',
        category: '其他',
        id: '4001'
    }, {
        title: '其他女歌手',
        category: '其他',
        id: '4002'
    }, {
        title: '其他组合/乐队',
        category: '其他',
        id: '4003'
    }],
    queue:[]
}
for(let index=65;index<=90;index++){
    singerConfig.queue.push({
        index,
        letter:String.fromCharCode(index)
    })
}
singerConfig.queue.push({
    index:0,
    letter:'其他'
})
module.exports = singerConfig;