import request from 'supertest';
import {
  doesEPAJsonFileExist,
} from '../utils';

const JSON_FILE_PATH: string = `${__dirname}/../../epa.json`;


it('Makes sure JSON file exists', () => {
  const doesFileExist = doesEPAJsonFileExist(JSON_FILE_PATH);
  expect(doesFileExist).toEqual(true);
});


it('Reads file from epa http server', async () => {
  await request('https://ita.ee.lbl.gov')
    .get('/html/contrib/EPA-HTTP.html')
    .send({})
    .expect(200);
});


it('Reads fallback file', () => {

});

it('Converts EPA input to JSON format', () => {

});

it('Serves JSON content', () => {

});
