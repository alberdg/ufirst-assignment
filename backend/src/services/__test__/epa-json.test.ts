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
