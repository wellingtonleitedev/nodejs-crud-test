import AppError from '@common/errors/AppError';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AuthenticatedDto from '../dtos/AuthenticatedDto';
import CreateSessionDto from '../dtos/CreateSessionDto';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class AuthenticateService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({
    login,
    password,
  }: CreateSessionDto): Promise<AuthenticatedDto> {
    const user = await this.usersRepository.getByLogin(login);

    if (!user) {
      throw new AppError('e-mail/password incorrect');
    }

    const correctPassword = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!correctPassword) {
      throw new AppError('e-mail/password incorrect');
    }

    const token = sign({ master: user.admin }, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}
