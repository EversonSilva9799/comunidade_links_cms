import { Router } from 'express';
import AuthController from '../../app/controllers/auth/AuthController';
const routes = Router();

routes.post('/auth', AuthController.store);

export default routes;
