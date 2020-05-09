import { Router } from 'express';
import PostController from './../../app/controllers/post/PostController';
import multer from 'multer';
const uploadConfig = require('../../app/config/upload');
const routes = Router();
const upload = multer(uploadConfig);
import auth from '../../app/middlewares/auth';

routes.get('/posts', PostController.index);
routes.get('/posts/:link', PostController.get);
routes.post('/posts', auth, upload.single('image'), PostController.store);
routes.put('/posts/:id', auth, upload.single('image'), PostController.update);
routes.delete('/posts/:id', auth, PostController.destroy);

export default routes;
