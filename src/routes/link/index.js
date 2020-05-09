import { Router } from 'express';
import LinkController from './../../app/controllers/link/LinkController';
import auth from '../../app/middlewares/auth';
const routes = Router();

routes.get('/links', LinkController.index);
routes.post('/links', auth, LinkController.store);
routes.delete('/links/:id', auth, LinkController.destroy);
routes.put('/links/:id', auth, LinkController.update);

export default routes;
