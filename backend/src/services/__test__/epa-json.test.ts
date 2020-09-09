import { epaJsonInstance } from '../epa-json';
import { getJSONEPARecords } from '../../utils/utils';

beforeEach(async () => {
  const records = await getJSONEPARecords();
  epaJsonInstance.records = records;
});

it('Should read and store epa json records', async () => {
  expect(epaJsonInstance.records).not.toBeNull();
  expect(epaJsonInstance.records.length).toBe(47619);
});

it('Groups requests by method', async () => {
  expect(epaJsonInstance.recordsByMethod).not.toBeNull();
  expect(Object.keys(epaJsonInstance.recordsByMethod).includes('GET')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByMethod).includes('POST')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByMethod).includes('PUT')).toBeFalsy();
  expect(Object.keys(epaJsonInstance.recordsByMethod).includes('DELETE')).toBeFalsy();
  expect(Object.keys(epaJsonInstance.recordsByMethod).includes('HEAD')).toBeTruthy();
})
