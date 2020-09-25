import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';

import '@common/infra/database';
import '@common/containers';

import errorHandling from './middlewares/errorHandling';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorHandling);

app.listen(3333, () => {
  console.log('Application Running');
});
