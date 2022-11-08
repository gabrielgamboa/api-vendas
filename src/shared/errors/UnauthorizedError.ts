import { ApplicationError } from './ApplicationError';

export class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message, 401);
  }
}
