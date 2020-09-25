import sessionRouter from '@modules/users/infra/http/routes/session.route';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
