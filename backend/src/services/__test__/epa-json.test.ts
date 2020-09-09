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


it('Groups requests by answer codes', async () => {
  expect(epaJsonInstance.recordsByAnswerCode).not.toBeNull();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).length).toEqual(7);
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('200')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('404')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('304')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('403')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('302')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('500')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('501')).toBeTruthy();
  expect(Object.keys(epaJsonInstance.recordsByAnswerCode).includes('201')).toBeFalsy();
})
