import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import GetUserService from '@modules/users/services/GetUserService';
import GetUsersService from '@modules/users/services/GetUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getUsers = container.resolve(GetUsersService);

    const users = await getUsers.execute();

    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute(id);

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const { id } = request.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({ id, name, email, password });

    return response.json(classToClass(user));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute(id);

    return response.json(classToClass(user));
  }
}
