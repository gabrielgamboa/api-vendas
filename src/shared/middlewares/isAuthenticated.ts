import { AuthConfig } from '@config/auth';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('JWT Token is missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = verify(token, AuthConfig.jwt.secret);

    return next();
  } catch (error) {
    throw new UnauthorizedError('Invalid JWT Token');
  }
}
