const { Router } = require('express');
const AuthController = require('../../app/controllers/auth/AuthController');
const routes = Router();

routes.post('/auth', AuthController.store);

module.exports = routes;
