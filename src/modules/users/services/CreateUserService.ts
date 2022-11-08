import { ApplicationError } from '@shared/errors/ApplicationError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExistsByEmail = await usersRepository.findByEmail(email);

    if (userExistsByEmail) throw new ApplicationError('Email already used.');

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}
