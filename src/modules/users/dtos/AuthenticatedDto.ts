import User from '../infra/database/entities/User';

export default interface AuthenticatedDto {
  user: User;
  token: string;
}
