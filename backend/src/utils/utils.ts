import { existsSync, createReadStream } from 'fs';
import readline from 'readline';
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
