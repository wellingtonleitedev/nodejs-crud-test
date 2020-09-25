import CreateUserDto from '@modules/users/dtos/CreateUserDto';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private entities: Repository<User>;

  constructor() {
    this.entities = getRepository(User);
  }

  public async get(): Promise<User[]> {
    const users = await this.entities.find();

    return users;
  }

  public async getById(id: string): Promise<User | undefined> {
    const user = await this.entities.findOne(id);

    return user;
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.entities.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async getByLogin(login: string): Promise<User | undefined> {
    const user = await this.entities.findOne({
      where: {
        login,
      },
    });

    return user;
  }

  public async create({
    login,
    name,
    email,
    password,
  }: CreateUserDto): Promise<User> {
    const user = this.entities.create({ login, name, email, password });

    await this.entities.save(user);

    return user;
  }

  public async save(user: User): Promise<void> {
    await this.entities.save(user);
  }

  public async delete(user: User): Promise<void> {
    await this.entities.remove(user);
  }
}
