import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionController from '../controllers/SessionController';

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      login: Joi.string().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
