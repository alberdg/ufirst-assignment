import { Request, Response, Router } from 'express';
import { epaJsonInstance } from '../services/epa-json';
const router: Router = Router();

router.get('/dashboard', (req: Request, res: Response) => {
  res.send({
    recordsByMinute: Object.values(epaJsonInstance.recordsByMinute),
    recordsByMethod: Object.values(epaJsonInstance.recordsByMethod),
    recordsByAnswerCode: Object.values(epaJsonInstance.recordsByAnswerCode),
    recordsBySize: Object.values(epaJsonInstance.recordsBySize),
  });
});

export { router as dashboardRouter };
