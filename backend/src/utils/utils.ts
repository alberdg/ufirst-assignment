import { existsSync } from 'fs';

/**
 * Checks if the JSON EPA file exists
 * @function
 * @param filePath JSON EPA file path
 * @returns result Flag indicating if EPA file exists
 */
export const doesEPAJsonFileExist = (filePath: string) : boolean => {
  return existsSync(filePath);
}
