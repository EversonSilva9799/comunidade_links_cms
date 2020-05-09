import { Router } from 'express';
import CategoryController from './../../app/controllers/category/CategoryController';
import auth from '../../app/middlewares/auth';
const routes = Router();

routes.get('/categorias', CategoryController.index);
routes.post('/categorias', auth, CategoryController.store);
routes.put('/categorias/:id', auth, CategoryController.update);
routes.delete('/categorias/:id', auth, CategoryController.destroy);

export default routes;
