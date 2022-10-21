import itemRouter from './itemRouter';
import shiftRouter from './shiftRouter';
import sellRouter from './sellRouter';
import userRouter from './userRouter'
import Router from 'koa-router';

const router = new Router();
router.use(itemRouter.routes());
router.use(shiftRouter.routes());
router.use(sellRouter.routes());
router.use(userRouter.routes());

export default router;