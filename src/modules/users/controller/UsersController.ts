import { Request, response, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { ListUsersService } from '../services/ListUsersService';
import { User } from '../typeorm/entities/User';

export class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();
    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    return res.status(201).json(user);
  }
}
