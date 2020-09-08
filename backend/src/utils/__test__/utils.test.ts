import request from 'supertest';
import {
  doesEPAJsonFileExist,
  readFallbackFile,
} from '../utils';

const JSON_FILE_PATH: string = `${__dirname}/../../epa.json`;


it('Makes sure JSON file exists', () => {
  const doesFileExist = doesEPAJsonFileExist(JSON_FILE_PATH);
  expect(doesFileExist).toEqual(true);
});

// Should be tested but it is hardly ever available
it.skip('Reads file from epa http server', async () => {
  await request('https://ita.ee.lbl.gov')
    .get('/html/contrib/EPA-HTTP.html')
    .send({})
    .expect(200);
});


it('Reads fallback file', async () => {
  const epaUnformattedRecords = await readFallbackFile();
  expect(epaUnformattedRecords).not.toBeNull();
  expect(epaUnformattedRecords.length).toEqual(47748);
});

it('Converts EPA input to JSON format', () => {
});

it('Serves JSON content', () => {

});
