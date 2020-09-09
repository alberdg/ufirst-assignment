import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { epaJSONRouter } from './routes/epa-json';
import { requestsByMinuteRouter } from './routes/requests-by-minute';
import { httpMethodsRouter } from './routes/http-methods';

const allowedOrigins = ['http://localhost:3000'];
/**
 * Sets security headers for given response
 * @function
 * @param <Object> req - Http request
 * @param <Object> res - Http response
 * @param <Object> next - Callback
 * @returns <void>
 */
const setSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Powered-By', 'UFirst Group API');
  res.setHeader('x-xss-protection', '1; mode=block');
  res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('x-frame-options', 'SAMEORIGIN');
  res.setHeader('x-content-type', 'nosniff');

  const origin: string = req.headers.origin!;
  if(allowedOrigins.includes(origin)){
    res.setHeader('Access-Control-Allow-Origin', origin || '*' );
  }
  next();
}

const app = express();
app.use(json());
app.use(setSecurityHeaders);
app.use(epaJSONRouter);
app.use(requestsByMinuteRouter);
app.use(httpMethodsRouter);

app.all('*', async (req: Request, res: Response) => {
  res.status(404).send('Not found');
});

export { app };
