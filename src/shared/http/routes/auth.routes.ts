import { AuthenticateController } from '@modules/users/controller/AuthenticateController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const authRoutes = Router();
const authenticateController = new AuthenticateController();

authRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateController.create,
);

export { authRoutes };
