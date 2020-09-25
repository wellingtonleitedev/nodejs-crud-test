import CreateUserDto from '../dtos/CreateUserDto';
import User from '../infra/database/entities/User';

export default interface IUsersRepository {
  get(): Promise<User[]>;
  getById(id: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  getByLogin(login: string): Promise<User | undefined>;
  create(data: CreateUserDto): Promise<User>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}
