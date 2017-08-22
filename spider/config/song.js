const songConfig = {
    common: 'https://music.163.com',
    comment: 'https://music.163.com/weapi/v1/resource/comments/',
    len: 10,
    key: {
        encSecKey: '2af4ca51b906def2e80755a34450db64e8a34f038ffa7ee66ae4c50fbaacc785eddcc1a63222928af3814c355f20b7f8d4e4b05f26879087acd1f8a4da79adaa4a59e3efb54c135017d7f94f7514603e208b0178f547f436c9ca11a3f45e27876c81c3f0a5d3a82854b9d39fdee0ac1b16ecd23503908595fc48359e0811f6d6',
        params: 'DQU/eyfHyqpTa40dLoNsxkRxCEmEsIgzAgKEYce7d5o78+o4DrdquhuTE5/h5PWqI027kSWd4Y1c9/h6mQFX8J9KiGI0zhV7hb6F7JzXjmg2wtky3SXDoXDn2IYKQnoF4mSXfjGtJdL9kA0KmJvNow=='
    },
    agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
}
songConfig.req = {
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': songConfig.agent
    },
    form: songConfig.key
}
module.exports = songConfig;