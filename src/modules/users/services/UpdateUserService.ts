import AppError from '@common/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UpdateUserDto from '../dtos/UpdateUserDto';
import User from '../infra/database/entities/User';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
  }: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const hasEmail = await this.usersRepository.getByEmail(email);

    if (hasEmail) {
      throw new AppError('Already exist a user with the same e-mail address');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    user.name = name;
    user.email = name;
    user.password = hashedPassword;

    return user;
  }
}
