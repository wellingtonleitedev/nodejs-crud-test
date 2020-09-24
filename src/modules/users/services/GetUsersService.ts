import { inject, injectable } from 'tsyringe';
import User from '../infra/database/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetUsersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.get();

    return users;
  }
}
