import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class HashProvider implements IHashProvider {
  public async generate(password: string): Promise<string> {
    return hash(password, 8);
  }

  public async compare(password: string, hashPass: string): Promise<boolean> {
    return compare(password, hashPass);
  }
}
