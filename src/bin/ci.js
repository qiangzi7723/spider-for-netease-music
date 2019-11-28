const puppeteer = require('puppeteer');
const artistList = require('./artistList.js');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://music.163.com/#/discover/artist');
    await artistList.init(page);
    await browser.close();
})();