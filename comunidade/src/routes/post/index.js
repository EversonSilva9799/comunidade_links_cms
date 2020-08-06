const { Router } = require('express');
const PostController = require('./../../app/controllers/post/PostController');
const routes = Router();
const auth = require('../../app/middlewares/auth');

routes.get('/posts', PostController.index);
routes.get('/posts/:link', PostController.get);
routes.post('/posts', auth, PostController.store);
routes.put('/posts/:id', auth, PostController.update);
routes.delete('/posts/:id', auth, PostController.destroy);

module.exports = routes;
