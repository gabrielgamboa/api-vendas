import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { routes } from './routes';
import { ApplicationError } from '@shared/errors/ApplicationError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApplicationError) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error.message,
  });
});

app.listen(3333, () => console.log('Server started on port 3333'));
