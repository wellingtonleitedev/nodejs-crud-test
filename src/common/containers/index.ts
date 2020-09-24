import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

import '@modules/users/providers/index';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
