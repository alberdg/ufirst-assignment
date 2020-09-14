import puppeteer, { Browser, Page } from 'puppeteer';

let browser: Browser, page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000/httpmethods');
  await page.waitFor('#header');
});

afterEach(() => {
  page.close();
  browser.close();
});

it('Renders requests-per-method-chart', async () => {
  let length = await page.$$eval('div > svg', el => el.length);
  expect(length).toEqual(1);
});

it('Renders a title', async () => {
  let length = await page.$$eval('#chart-title', el => el.length);
  const text = await page.$eval('#chart-title', el => el.innerHTML);
  expect(length).toEqual(1);
  expect(text).toEqual('Requests per method');
})
