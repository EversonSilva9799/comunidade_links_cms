import { Router } from 'express';
import UserController from '../../app/controllers/user/UserController';

const routes = Router();

routes.post('/usuarios', UserController.store);

export default routes;
