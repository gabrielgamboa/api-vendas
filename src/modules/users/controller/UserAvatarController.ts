import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

export class UserAvatarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarFile = req.file!.filename;
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: id,
      avatarFile,
    });

    return res.json(user);
  }
}
