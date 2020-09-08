import puppeteer, { Browser, Page } from 'puppeteer';
const TOOLBAR_BUTTON = '#toolbar';

let browser: Browser, page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
  await page.waitFor('#header');
});

afterEach(() => {
  page.close();
  browser.close();
});

it('Display a header', async () => {
  let length = await page.$$eval('#header', el => el.length);
  expect(length).toEqual(1);
})

it('Display a logo', async () => {
  let length = await page.$$eval('#logo', el => el.length);
  expect(length).toEqual(1);
})

it('Does not display requests per minute link', async () => {
  let length = await page.$$eval('#requests-per-minute', el => el.length);
  expect(length).toEqual(0);
})

it('Displays requests per minute link', async () => {
  await page.click(TOOLBAR_BUTTON);
  let length = await page.$$eval('#requests-per-minute', el => el.length);
  expect(length).toEqual(1);
})

it('Does not display HTTP methods link', async () => {
  let length = await page.$$eval('#http-methods', el => el.length);
  expect(length).toEqual(0);
});

it('Displays HTTP methods link', async () => {
  await page.click(TOOLBAR_BUTTON);
  let length = await page.$$eval('#http-methods', el => el.length);
  expect(length).toEqual(1);
});


it('Does not display HTTP answer codes link', async () => {
  let length = await page.$$eval('#http-answer-codes', el => el.length);
  expect(length).toEqual(0);
})

it('Displays HTTP answer codes link', async () => {
  await page.click(TOOLBAR_BUTTON);
  let length = await page.$$eval('#http-answer-codes', el => el.length);
  expect(length).toEqual(1);
})


it('Does not display size of answers link', async () => {
  let length = await page.$$eval('#answers-size', el => el.length);
  expect(length).toEqual(0);
})

it('Displays size of answers link', async () => {
  await page.click(TOOLBAR_BUTTON);
  let length = await page.$$eval('#answers-size', el => el.length);
  expect(length).toEqual(1);
})
