import { epaJsonInstance } from '../epa-json';
it('Should read and store epa json records', async () => {
  const records = await epaJsonInstance.getRecords();
  expect(records).not.toBeNull();
  expect(records.length).toBe(47619);
});
