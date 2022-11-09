import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

export class AuthenticateService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedError('Email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new UnauthorizedError('Email or password incorrect');

    const token = sign({}, 'b8e4ac1f7a0f5ddb3c4e94c915bedc9d', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { token };
  }
}
