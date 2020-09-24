import AppError from '@common/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/database/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
