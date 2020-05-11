const { Router } = require('express');
const AccountController = require('../../app/controllers/account/AccountController');
const routes = Router();

routes.get('/contas/ativar/:code', AccountController.get);
routes.post('/contas/esqueci-senha', AccountController.post);
routes.put('/contas/senhas/:code', AccountController.updatePass);

module.exports = routes;
