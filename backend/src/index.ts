import { app } from './app';
import { EPAJsonRecord } from './interfaces/epa-json';
import { epaJsonInstance } from './services/epa-json';
import { getJSONEPARecords } from './utils/utils';

const start = async () => {
  const records: EPAJsonRecord[] = await getJSONEPARecords();
  epaJsonInstance.records = records;
  app.listen(3001, () => {
    console.log('Listening on port 3001');
  });
};

start();
