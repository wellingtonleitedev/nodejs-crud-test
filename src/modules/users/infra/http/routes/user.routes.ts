import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const userRouter = Router();

userRouter.get('/', usersController.create);
userRouter.get('/', usersController.create);
userRouter.post('/', usersController.create);
userRouter.put('/', usersController.create);
userRouter.delete('/', usersController.create);

export default userRouter;
