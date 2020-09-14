import request from 'supertest';
import { app } from '../../app';
import { epaJsonInstance } from '../../services/epa-json';
import {
  doesEPAJsonFileExist,
  readFallbackFile,
  transformEPAToJSON,
  getJSONEPARecords,
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

it('Converts EPA input to JSON format', async () => {
  const epaUnformattedRecords = await readFallbackFile();
  const epaJSONRecords = transformEPAToJSON(epaUnformattedRecords);
  expect(epaJSONRecords).not.toBeNull();
  expect(epaJSONRecords.length).toEqual(47619);
  expect(epaJSONRecords[0].host).toEqual('141.243.1.172');
  expect(epaJSONRecords[0].datetime.day).toEqual(29);
  expect(epaJSONRecords[0].datetime.hour).toEqual(23);
  expect(epaJSONRecords[0].datetime.minute).toEqual(53);
  expect(epaJSONRecords[0].datetime.second).toEqual(25);
  expect(epaJSONRecords[0].request.method).toEqual('GET');
  expect(epaJSONRecords[0].request.url).toEqual('/Software.html');
  expect(epaJSONRecords[0].request.protocol).toEqual('HTTP');
  expect(epaJSONRecords[0].request.protocol_version).toEqual('1.0');
  expect(epaJSONRecords[0].response_code).toEqual(200);
  expect(epaJSONRecords[0].document_size).toEqual(1497);
  expect(epaJSONRecords[0].error).toEqual(false);

});

it('Serves JSON content', async () => {
  const records = await getJSONEPARecords();
  epaJsonInstance.records = records;
  const response = await request(app)
    .get('/json')
    .send({});
  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(47619);
});
