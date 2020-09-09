import { Request, Response, Router } from 'express';
import { epaJsonInstance } from '../services/epa-json';
const router: Router = Router();

router.get('/answercodes', (req: Request, res: Response) => {
  res.send(epaJsonInstance.recordsByAnswerCode);
});

export { router as answerCodesRouter };
