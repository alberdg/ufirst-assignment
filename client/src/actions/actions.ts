import axios from 'axios';
import {
  EPA_URL,
  HTTP_REQUEST_BY_MINUTE_URL,
  HTTP_REQUEST_BY_METHOD_URL,
  HTTP_REQUEST_BY_ANSWER_CODE_URL,
} from '../constants';
import { EPAJsonRecord } from '../interfaces/epa-json';

/**
 * Retrieves EPA Json records from  the server
 * @function
 * @returns epaRecords Array with EPA JSON records
 */
export const getEPAJsonRecords = async () : Promise<EPAJsonRecord[]> => {
  const response = await axios.get(EPA_URL);
  return response.data;
}

/**
 * Retrieves EPA Json records from  the server
 * @function
 * @returns epaRecords Array with EPA JSON records grouped by minute
 */
export const getHttpRequestsByMinute = async () : Promise<any> => {
  const response = await axios.get(HTTP_REQUEST_BY_MINUTE_URL);
  return response.data;
}

/**
 * Retrieves EPA Json records from  the server
 * @function
 * @returns epaRecords Array with EPA JSON records grouped by method
 */
export const getHttpRequestsByMethod = async() : Promise<any> => {
  const response = await axios.get(HTTP_REQUEST_BY_METHOD_URL);
  return response.data;
}


/**
 * Retrieves EPA Json records from  the server
 * @function
 * @returns epaRecords Array with EPA JSON records grouped by answer code
 */
export const getHttpRequestsByAnswerCode = async() : Promise<any> => {
  const response = await axios.get(HTTP_REQUEST_BY_ANSWER_CODE_URL);
  return response.data;
}
