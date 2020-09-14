import request from 'supertest';
import { app } from '../../app';
import { epaJsonInstance } from '../../services/epa-json';
import { getJSONEPARecords } from '../../utils/utils';

beforeEach(async () => {
  const records = await getJSONEPARecords();
  epaJsonInstance.records = records;
});

it('Fetches http answer codes grouped', async () => {
    const response = await request(app)
      .get('/answercodes')
      .send({});
    expect(response.status).toEqual(200);
    expect(Object.keys(response.body).length).toEqual(7);
    expect(Object.keys(response.body).includes('200')).toBeTruthy();
    expect(Object.keys(response.body).includes('404')).toBeTruthy();
    expect(Object.keys(response.body).includes('304')).toBeTruthy();
    expect(Object.keys(response.body).includes('403')).toBeTruthy();
    expect(Object.keys(response.body).includes('302')).toBeTruthy();
    expect(Object.keys(response.body).includes('500')).toBeTruthy();
    expect(Object.keys(response.body).includes('501')).toBeTruthy();
    expect(Object.keys(response.body).includes('201')).toBeFalsy();
});
