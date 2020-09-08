import express from 'express';
import { json } from 'body-parser';
import { epaJSONRouter } from './routes/epa-json';

const app = express();
app.use(json());
app.use(epaJSONRouter);

app.all('*', async (req, res) => {
  res.status(404).send('Not found');
});

export { app };
