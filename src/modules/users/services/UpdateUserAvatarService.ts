import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { upload } from '@config/upload';
import { NotFoundError } from '@shared/errors/NotFoundError';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  avatarFile: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFile }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.avatar) {
      const avatarFilePath = path.join(upload.directory, user.avatar);
      const fileExists = await fs.promises.stat(avatarFilePath);

      if (fileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatarFile;
    await usersRepository.save(user);

    return user;
  }
}
