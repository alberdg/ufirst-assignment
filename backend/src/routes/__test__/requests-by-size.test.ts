import request from 'supertest';
import { app } from '../../app';
import { epaJsonInstance } from '../../services/epa-json';
import { getJSONEPARecords } from '../../utils/utils';

beforeEach(async () => {
  const records = await getJSONEPARecords();
  epaJsonInstance.records = records;
});

it('Fetches http requests grouped by size', async () => {
    const response = await request(app)
      .get('/requestsbysize')
      .send({});
    expect(response.status).toEqual(200);
    expect(Object.keys(response.body).length).toEqual(20);
});
