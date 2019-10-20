const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.nact.jp/exhibition_special/');

  const n_event = (await page.$$('#content > section:nth-child(3) > ul > li')).length
  let events = []
  for(var i = 1; i < n_event + 1; i += 1) {

    const link  = await page.$eval(`#content > section:nth-child(3) > ul > li:nth-child(${i}) > a`, el => el.href)
    const src   = await page.$eval(`#content > section:nth-child(3) > ul > li:nth-child(${i}) > a > figure > img`, el => el.src)
    const title = await page.$eval(`#content > section:nth-child(3) > ul > li:nth-child(${i}) > a > div > h3`, el => el.innerText)

    events[events.length] = {
      link, src, title
    }
  }

  console.log(events)

  await browser.close();
})();
