import { existsSync, createReadStream } from 'fs';
import readline from 'readline';
import { EPAJsonRecord, EPADateTime, EPARequest } from '../interfaces/epa-json';
import { FALLBACK_EPA_FILE_PATH } from '../constants';



/**
 * Checks if the JSON EPA file exists
 * @function
 * @param filePath JSON EPA file path
 * @returns result Flag indicating if EPA file exists
 */
export const doesEPAJsonFileExist = (filePath: string) : boolean => {
  return existsSync(filePath);
}


/**
 * Reads EPA fallback file
 * @function
 * @returns records EPA records unformatted
 */
export const readFallbackFile = () : Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const lines: string[] = [];
    const readInterface = readline.createInterface({
      input: createReadStream(FALLBACK_EPA_FILE_PATH),
    })
    readInterface.on('line', (line: string) => lines.push(line));

    readInterface.on('close', () => resolve(lines));

    readInterface.on('error', err => reject(err));
  });

}

/**
 * Builds an EPADateTime from the given string
 * @function
 * @param value datetime string
 * @returns ePADateTime EPADateTime object
 */
const getDatetimeFromRecord = (value: string) : EPADateTime => {
  if (value.trim().length === 0 || !value.includes(':')) throw new Error('Invalid date time record');
  const fields: string[] = value.substr(1, value.length - 2).split(':');
  if (!Array.isArray(fields) || fields.length !== 4) throw new Error('Invalid date time record');
  return {
    day: parseInt(fields[0]),
    hour: parseInt(fields[1]),
    minute: parseInt(fields[2]),
    second: parseInt(fields[3])
  };
}

/**
 * Builds an EPARequest from the given string
 * @function
 * @param value Request string
 * @returns epaRequest EPARequest object
 */
const getRequestFromRecord = (value: string) : EPARequest => {
  const fields = value.substring(value.indexOf('"') + 1, value.lastIndexOf('"')).split(' ');
  if (!Array.isArray(fields) || fields.length !== 3) throw new Error('Invalid request field');
  return {
    method: fields[0],
    url: fields[1],
    protocol: getProtocol(fields[2]),
    protocol_version: getProtocolVersion(fields[2])
  };
}

/**
 * Gets protocol version from string
 * @function
 * @param value Protocol string
 * @returns protocol Protocol value
 */
const getProtocol = (value: string) : string => {
  if (!value.includes('/')) throw new Error('Invalid protocol');
  return value.split('/')[0];
}

/**
 * Gets protocol version from string
 * @function
 * @param value Protocol string
 * @returns protocol_version Protocol version value
 */
const getProtocolVersion = (value: string) : string => {
  if (!value.includes('/')) throw new Error('Invalid protocol version');
  return value.split('/')[1];
}

/**
 * Creates an error EPSJsonRecord
 * @function
 * @returns error Error EPAJsonRecord
 */
const getEpaErrorRecord = () : EPAJsonRecord => {
  return {
    host: '',
    datetime: {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    },
    request: {
      method: '',
      url: '',
      protocol: '',
      protocol_version: ''
    },
    response_code: 0,
    document_size: 0,
    error: true,
  };
}


/**
 * Transforms an EPA line to a EPAJsonRecord format
 * @function
 * @param record EPA unformatted record
 * @returns epaJsonRecord EPAJsonRecord formatted
 */
const transformEPARecord = (record: string, errorEpaRecord: EPAJsonRecord) : EPAJsonRecord => {
  const fields: string[] = record.split(' ');

  if (!Array.isArray(fields) || fields.length < 7) return errorEpaRecord; // Not a valid record
  try {
    const datetime: EPADateTime = getDatetimeFromRecord(fields[1]);
    const request: EPARequest = getRequestFromRecord(record);
    return {
      host: fields[0],
      datetime,
      request,
      response_code: parseInt(fields[5]),
      document_size: parseInt(fields[6]),
      error: false,
    };
  } catch (err) {
    return errorEpaRecord;
  }

}

/**
 * Transforms the given array of unformatted epa records to its EPAJsonRecord representation
 * @function
 * @param epaRecords Unformatted EPA records
 * @returns epaJsonRecords Formatted EPAJsonRecord
 */
export const transformEPAToJSON = (epaRecords: string[]) : EPAJsonRecord[] => {
  const errorEpaRecord: EPAJsonRecord = getEpaErrorRecord();
  return epaRecords.map((record: string) => transformEPARecord(record, errorEpaRecord))
    .filter((record: EPAJsonRecord) => !record.error);
}

/**
 * Reads and converts unformatted EPA records to EPAJsonRecord format
 * @function
 * @returns records EPAJsonRecord array
 */
export const getJSONEPARecords = async () => {
  // TODO: Implement request to ita.ee.lbl.gov BUT IT IS ALWAYS UNAVAILABLE!!!!
  const unformatted: string[] = await readFallbackFile();
  return transformEPAToJSON(unformatted);
}
