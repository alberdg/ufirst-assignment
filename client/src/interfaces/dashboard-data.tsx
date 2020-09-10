import { RequestsByMinute } from './request-by-minute';
import { RequestsByMethod } from './request-by-method';
import { RequestsByAnswerCode } from './request-by-answer-code';
import { RequestsBySize } from './request-by-size';

export interface DashboardData {
  recordsByMinute: RequestsByMinute[];
  recordsByMethod: RequestsByMethod[];
  recordsByAnswerCode: RequestsByAnswerCode[];
  recordsBySize: RequestsBySize[];
}
