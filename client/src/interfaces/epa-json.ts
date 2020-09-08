export interface EPADateTime {
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export interface EPARequest {
  method: string;
  url: string;
  protocol: string;
  protocol_version: string;
};

export interface EPAJsonRecord {
  host: string,
  datetime: EPADateTime,
  request: EPARequest,
  response_code: number;
  document_size: number;
  error: boolean;
};
