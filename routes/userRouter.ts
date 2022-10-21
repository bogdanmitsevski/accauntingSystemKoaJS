import Router from 'koa-router';
import userController from '../controllers/userController';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);

export default router;