import { Router } from 'express';
import categoryRoutes from './category';
import postRoutes from './post';
import linkRoutes from './link';
import authRoutes from './auth';
import userRoutes from './user';
const routes = Router();

routes.use(categoryRoutes);
routes.use(postRoutes);
routes.use(linkRoutes);
routes.use(authRoutes);
routes.use(userRoutes);

export default routes;
