import request from 'supertest';
import { app } from '../../app';
import { epaJsonInstance } from '../../services/epa-json';
import { getJSONEPARecords } from '../../utils/utils';

beforeEach(async () => {
  const records = await getJSONEPARecords();
  epaJsonInstance.records = records;
});

it('Fetches http methods grouped', async () => {
    const response = await request(app)
      .get('/httpmethods')
      .send({});
    expect(response.status).toEqual(200);
    expect(Object.keys(response.body).length).toEqual(3);
    expect(Object.keys(response.body).includes('GET')).toBeTruthy();
    expect(Object.keys(response.body).includes('POST')).toBeTruthy();
    expect(Object.keys(response.body).includes('HEAD')).toBeTruthy();
    expect(Object.keys(response.body).includes('PUT')).toBeFalsy();
    expect(Object.keys(response.body).includes('DELETE')).toBeFalsy();
});
