import request from 'supertest';
import { app } from '../../app';
import { epaJsonInstance } from '../../services/epa-json';
import { getJSONEPARecords } from '../../utils/utils';

beforeEach(async () => {
  const records = await getJSONEPARecords();
  epaJsonInstance.records = records;
});

it('Fetches dashboard data', async () => {
    const response = await request(app)
      .get('/dashboard')
      .send({});
    expect(response.status).toEqual(200);
    expect(response.body).not.toBeNull();
    expect(response.body.recordsByMinute).not.toBeNull();
    expect(response.body.recordsByMethod).not.toBeNull();
    expect(response.body.recordsByAnswerCode).not.toBeNull();
    expect(response.body.recordsBySize).not.toBeNull();
});
