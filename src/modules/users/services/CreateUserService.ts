import AppError from '@common/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CreateUserDto from '../dtos/CreateUserDto';
import User from '../infra/database/entities/User';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDto): Promise<User> {
    const hasUser = await this.usersRepository.getByEmail(email);

    if (hasUser) {
      throw new AppError('Already exist a user with the same e-mail address');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
