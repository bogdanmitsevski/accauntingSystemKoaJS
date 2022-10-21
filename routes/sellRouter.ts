import Router from 'koa-router';
import sellController from '../controllers/sellController';
import authMiddleware from '../middleware/authMiddleware';
const router = new Router();

router.post('/createSell', authMiddleware, sellController.newSell);

export default router;