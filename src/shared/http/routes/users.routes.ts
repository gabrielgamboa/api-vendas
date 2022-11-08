import { UsersController } from '@modules/users/controller/UsersController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export { usersRouter };
