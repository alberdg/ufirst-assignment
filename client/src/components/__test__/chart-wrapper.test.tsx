import puppeteer, { Browser, Page } from 'puppeteer';

let browser: Browser, page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
  await page.waitFor('#chart-wrapper');
});

afterEach(() => {
  page.close();
  browser.close();
});

it('Renders chart wrapper', async () => {
  let length = await page.$$eval('#chart-wrapper', el => el.length);
  expect(length).toEqual(1);
  length = await page.$$eval('#chart-title', el => el.length);
  expect(length).toEqual(1);
  length = await page.$$eval('#chart', el => el.length);
  expect(length).toEqual(1);
})
