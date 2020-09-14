import { Request, Response, Router } from 'express';
import { epaJsonInstance } from '../services/epa-json';

const router: Router = Router();

router.get('/requestsbyminute', (req: Request, res: Response) => {
  res.send(epaJsonInstance.recordsByMinute);
})

export { router as requestsByMinuteRouter };
