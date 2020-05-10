const { Router } = require('express');
const CategoryController = require('./../../app/controllers/category/CategoryController');
const auth = require('../../app/middlewares/auth');
const routes = Router();

routes.get('/categorias', CategoryController.index);
routes.post('/categorias', auth, CategoryController.store);
routes.put('/categorias/:id', auth, CategoryController.update);
routes.delete('/categorias/:id', auth, CategoryController.destroy);

module.exports = routes;
