const { Router } = require('express');
const PostController = require('./../../app/controllers/post/PostController');
const multer = require('multer');
const uploadConfig = require('../../config/upload');
const routes = Router();
const upload = multer(uploadConfig);
const auth = require('../../app/middlewares/auth');

routes.get('/posts', PostController.index);
routes.get('/posts/:link', PostController.get);
routes.post('/posts', auth, upload.single('image'), PostController.store);
routes.put('/posts/:id', auth, upload.single('image'), PostController.update);
routes.delete('/posts/:id', auth, PostController.destroy);

module.exports = routes;
