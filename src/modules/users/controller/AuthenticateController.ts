import { Request, Response } from 'express';
import { AuthenticateService } from '../services/AuthenticateService';

export class AuthenticateController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateService = new AuthenticateService();
    const user = await authenticateService.execute({ email, password });
    return res.status(201).json(user);
  }
}
