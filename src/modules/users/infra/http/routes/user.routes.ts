import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import regularAuthenticated from '../middlewares/regularAuthenticated';
import masterAuthenticated from '../middlewares/masterAuthenticated';

const usersController = new UsersController();

const userRouter = Router();

userRouter.get('/', regularAuthenticated, usersController.show);
userRouter.post(
  '/',
  masterAuthenticated,
  celebrate({
    [Segments.BODY]: {
      login: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);
userRouter.put(
  '/',
  regularAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().allow(''),
      password: Joi.string().when('old_password', {
        is: (val: string) => val.length,
        then: Joi.string().min(6).required(),
        otherwise: Joi.string().allow(''),
      }),
      password_confirmation: Joi.string().when('password', {
        is: (val: string) => val.length,
        then: Joi.string().min(6).required(),
        otherwise: Joi.string().allow(''),
      }),
    },
  }),
  usersController.update,
);
userRouter.delete('/:id', masterAuthenticated, usersController.destroy);

export default userRouter;
