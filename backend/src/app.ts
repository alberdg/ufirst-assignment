import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { epaJSONRouter } from './routes/epa-json';
import { requestsByMinuteRouter } from './routes/requests-by-minute';

const app = express();
app.use(json());
app.use(epaJSONRouter);
app.use(requestsByMinuteRouter);
app.all('*', async (req: Request, res: Response) => {
  res.status(404).send('Not found');
});

export { app };
