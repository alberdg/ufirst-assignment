import { Request, Response, Router } from 'express';
import { epaJsonInstance } from '../services/epa-json';
const router: Router = Router();

router.get('/dashboard', (req: Request, res: Response) => {
  res.send({
    recordsByMinute: epaJsonInstance.recordsByMinute,
    recordsByMethod: epaJsonInstance.recordsByMethod,
    recordsByAnswerCode: epaJsonInstance.recordsByAnswerCode,
    recordsBySize: epaJsonInstance.recordsBySize,
  });
});

export { router as dashboardRouter };
