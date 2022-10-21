import Router from 'koa-router';
import itemController from '../controllers/itemController';
import authMiddleware from '../middleware/authMiddleware';

const router = new Router();

router.get('/items', authMiddleware, itemController.getItem);

router.post('/createItem', authMiddleware, itemController.createItem);

export default router;