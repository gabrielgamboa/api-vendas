import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  public async execute({ email, password }: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedError('Email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new UnauthorizedError('Email or password incorrect');

    return user;
  }
}
