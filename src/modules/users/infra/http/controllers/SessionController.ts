import AuthenticateService from '@modules/users/services/AuthenticateService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateService = container.resolve(AuthenticateService);

    const user = await authenticateService.execute({ email, password });

    return response.json(classToClass(user));
  }
}
