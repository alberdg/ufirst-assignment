import { EPAJsonRecord } from '../interfaces/epa-json';
import { getJSONEPARecords } from '../utils/utils';

/**
 * Singleton class to keep epa json records in memory for efficiency purposes
 * @class
 */
class EpaJSON {
  private _records: EPAJsonRecord[] = [];

  /**
   * Getter for EpaJSON
   * @function
   * @returns records Epa JSON Records
   */
  async getRecords () {
    if (!Array.isArray(this._records) || this._records.length === 0) {
      console.log('Reading from file');
      this._records = await getJSONEPARecords();
    }
    console.log('Returning');
    return this._records;
  }
}

export const epaJsonInstance = new EpaJSON();
