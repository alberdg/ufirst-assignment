import { EPAJsonRecord } from '../interfaces/epa-json';

/**
 * Singleton class to keep epa json records in memory for efficiency purposes
 * @class
 */
class EpaJSON {
  private _records: EPAJsonRecord[] = [];
  private _recordsByMinute: any = {};

  /**
   * Getter for EpaJSON
   * @function
   * @returns records Epa JSON Records
   */
  get records () {
    return this._records;
  }

  set records (records: EPAJsonRecord[]) {
    this._records = records;
    this.aggregateRecordsByMinute();
  }

  /**
   * Getter for aggregated records by minute
   * @function
   * @returns recordsByMinute Aggregated records by minute
   */
  get recordsByMinute () : any {
    return this._recordsByMinute;
  }

  /**
   * Order records by minute
   * @function
   * @returns epaJSONRecords EPAJsonRecords ordered by minute asc
   */
  getRecordsOrderedByMinuteAsc () : EPAJsonRecord[] {
    return this._records.sort((a: EPAJsonRecord, b: EPAJsonRecord) : number => {
      if (a.datetime.minute > b.datetime.minute ) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Aggregates number of requests per minute
   * @function
   */
  aggregateRecordsByMinute () {
    const orderedByMinuteAsc: EPAJsonRecord[] = this.getRecordsOrderedByMinuteAsc();

    orderedByMinuteAsc.forEach((record: EPAJsonRecord) => {
      const { minute } : { minute: number } = record.datetime;
      const key: string = `${minute}`;
      if (!this._recordsByMinute[key]) {
        this._recordsByMinute[key] = 0;
      }
      this._recordsByMinute[key]++;
    });
  }
}

export const epaJsonInstance = new EpaJSON();
