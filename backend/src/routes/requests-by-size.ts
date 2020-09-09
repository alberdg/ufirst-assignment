import { Request, Response, Router } from 'express';
import { epaJsonInstance } from '../services/epa-json';
const router: Router = Router();

router.get('/requestsbysize', (req: Request, res: Response) => {
  res.send(epaJsonInstance.recordsBySize);
});

export { router as requestsSizeRouter };
