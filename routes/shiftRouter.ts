import Router from 'koa-router';
import shiftController from '../controllers/shiftController';
import authMiddleware from '../middleware/authMiddleware';

const router = new Router();

router.post('/startShift', authMiddleware, shiftController.startShift);
router.post('/finishShift', authMiddleware, shiftController.finishShift);
router.get('/lastShift', authMiddleware, shiftController.getLastShift);

export default router;