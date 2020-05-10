const { Router } = require('express');
const UserController = require('../../app/controllers/user/UserController');

const routes = Router();

routes.post('/usuarios', UserController.store);

module.exports = routes;
