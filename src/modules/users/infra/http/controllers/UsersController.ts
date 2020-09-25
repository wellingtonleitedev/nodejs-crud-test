import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import GetUserService from '@modules/users/services/GetUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute(id);

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { login, name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ login, name, email, password });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      old_password,
      password,
      password_confirmation,
    } = request.body;
    const { id } = request.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      old_password,
      password,
      password_confirmation,
    });

    return response.json(classToClass(user));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: sessionUserId } = request.user;
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id, sessionUserId);

    return response.status(204).json();
  }
}
