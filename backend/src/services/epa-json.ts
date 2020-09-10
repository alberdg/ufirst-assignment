import { EPAJsonRecord } from '../interfaces/epa-json';

/**
 * Singleton class to keep epa json records in memory for efficiency purposes
 * @class
 */
class EpaJSON {
  private _records: EPAJsonRecord[] = [];
  private _recordsByMinute: any = {};
  private _recordsByMethod: any = {};
  private _recordsByAnswerCode: any = {};
  private _recordsBySize: any = {};

  /**
   * Getter for EpaJSON
   * @function
   * @returns records Epa JSON Records
   */
  get records () {
    return this._records;
  }

  /**
   * Setter for EpaJson records
   * @function
   * @param records EPAJsonRecord array
   */
  set records (records: EPAJsonRecord[]) {
    this._records = records;
    this.aggregateRecordsByMinute();
    this.aggregateRecordsByMethod();
    this.aggregateRecordsByAnswerCode();
    this.aggregateRecordsBySize();
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
  aggregateRecordsByMinute () : void {
    const orderedByMinuteAsc: EPAJsonRecord[] = this.getRecordsOrderedByMinuteAsc();

    orderedByMinuteAsc.forEach((record: EPAJsonRecord) => {
      const { minute } : { minute: number } = record.datetime;
      const key: string = `${minute}`;
      if (!this._recordsByMinute[key]) {
        this._recordsByMinute[key] = {
          minute: key,
          value: 0
        };
      }
      this._recordsByMinute[key].value++;
    });
  }

  /**
   * Getter for aggregated records by method
   * @function
   * @returns recordsByMinute Aggregated records by method
   */
  get recordsByMethod () : any {
    return this._recordsByMethod;
  }

  /**
   * Aggregates records by method
   * @function
   */
  aggregateRecordsByMethod () : void {
    this._records.forEach((record: EPAJsonRecord) => {
      const { method } : { method: string } = record.request;
      if (!this._recordsByMethod[method]) {
        this._recordsByMethod[method] = {
          id: method,
          label: method,
          value: 0
        };
      }
      this._recordsByMethod[method].value++;
    });
  }

  /**
   * Getter for aggregated records by method
   * @function
   * @returns recordsByMinute Aggregated records by method
   */
  get recordsByAnswerCode () : any {
    return this._recordsByAnswerCode;
  }

  /**
   * Aggregates records by answerCode
   * @function
   */
  aggregateRecordsByAnswerCode () : void {
    this._records.forEach((record: EPAJsonRecord) => {
      const { response_code } : { response_code: number } = record;
      const responseCodeKey = `${response_code}`;
      if (!this._recordsByAnswerCode[responseCodeKey]) {
        this._recordsByAnswerCode[responseCodeKey] = {
          id: responseCodeKey,
          value: 0
        };
      }
      this._recordsByAnswerCode[responseCodeKey].value++;
    });
  }

  /**
   * Getter for aggregated records by size
   * @function
   * @returns recordsByMinute Aggregated records by size
   */
  get recordsBySize () : any {
    return this._recordsBySize;
  }

  /**
   * Aggregates records by size
   * @function
   */
  aggregateRecordsBySize () : void {
    this._records.forEach((record: EPAJsonRecord) => {
      const { response_code, document_size } :
      { response_code: number, document_size: number } = record;
      // Only want to keep those with status 200 and size < 1000 bytes
      if (response_code === 200 && document_size < 1000) {
        const documentSizeKey = `${document_size}`;
        if (!this._recordsBySize[documentSizeKey]) {
          this._recordsBySize[documentSizeKey] = {
            id: documentSizeKey,
            value: 0
          };
        }
        this._recordsBySize[documentSizeKey].value++;
      }
    });
  }
}

export const epaJsonInstance = new EpaJSON();
