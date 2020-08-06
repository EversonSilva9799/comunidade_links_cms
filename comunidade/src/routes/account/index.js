const { Router } = require('express');
const AccountController = require('../../app/controllers/account/AccountController');
const routes = Router();

routes.get('/contas/ativar/:code', AccountController.get);
routes.post('/account/reset', AccountController.post);
routes.put('/account/reset/:code', AccountController.updatePass);

module.exports = routes;
