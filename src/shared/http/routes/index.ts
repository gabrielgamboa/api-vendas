import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { productsRouter } from './products.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRoutes);

export { routes };
