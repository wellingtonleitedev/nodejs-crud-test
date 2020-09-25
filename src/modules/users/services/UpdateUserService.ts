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
    old_password,
    password,
    password_confirmation,
  }: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithSameEmail = await this.usersRepository.getByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== user.id) {
      throw new AppError('Already exist a user with the same e-mail address');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need inform a old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compare(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError("Old password doesn't match");
      }

      if (password !== password_confirmation) {
        throw new AppError("password and password confirmation doesn't match");
      }

      user.password = await this.hashProvider.generate(password);
    }

    await this.usersRepository.save(user);

    return user;
  }
}
