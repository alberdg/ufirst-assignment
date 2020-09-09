import { Request, Response, Router } from 'express';
import { epaJsonInstance } from '../services/epa-json';
const router: Router = Router();

router.get('/httpmethods', (req: Request, res: Response) => {
  res.send(epaJsonInstance.recordsByMethod);
});

export { router as httpMethodsRouter };
