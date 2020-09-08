import { Request, Response, Router } from 'express';
import { epaJsonInstance } from '../services/epa-json';
const router = Router();

router.get('/json', async (req: Request, res: Response) => {
  const records = await epaJsonInstance.getRecords();
  res.send(records);
});

export { router as epaJSONRouter };
