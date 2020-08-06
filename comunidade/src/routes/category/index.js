const { Router } = require('express');
const CategoryController = require('./../../app/controllers/category/CategoryController');
const auth = require('../../app/middlewares/auth');
const routes = Router();

routes.get('/categories', CategoryController.index);
routes.post('/categories', auth, CategoryController.store);
routes.put('/categories/:id', auth, CategoryController.update);
routes.delete('/categories/:id', auth, CategoryController.destroy);

module.exports = routes;
