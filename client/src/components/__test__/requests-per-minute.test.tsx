import puppeteer, { Browser, Page } from 'puppeteer';

let browser: Browser, page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000/requests');
  await page.waitFor('#header');
});

afterEach(() => {
  page.close();
  browser.close();
});

it('Renders requests-per-minute-chart', async () => {
  let length = await page.$$eval('div > svg', el => el.length);
  expect(length).toEqual(1);
});
