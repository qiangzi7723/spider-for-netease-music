const mysqlDB = require('../client/mysql.js');

module.exports = {
    async init(page) {
        const jump = await this.initCheck()
        if (jump) return
        console.log('正在拉取所有歌手的地址');
        const frame = page.frames().find(frame => frame.name() === 'contentFrame');
        const nav = await frame.$('#singer-cat-nav');
        const list = await nav.$$eval('a', doms => {
            return doms.map(dom => {
                return {
                    name: dom.text,
                    href: dom.href
                }
            })
        });
        await this.toMysql(list);
    },
    async toMysql(list) {
        return await mysqlDB('artist_list').insert(list);
    },
    async initCheck() {
        const res = await mysqlDB('artist_list').select()
        if (res.length > 0) return true
        return false
    }
}