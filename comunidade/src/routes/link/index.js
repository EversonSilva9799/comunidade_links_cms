const { Router } = require('express');
const LinkController = require('./../../app/controllers/link/LinkController');
const auth = require('../../app/middlewares/auth');
const routes = Router();

routes.get('/links', LinkController.index);
routes.post('/links', auth, LinkController.store);
routes.delete('/links/:id', auth, LinkController.destroy);
routes.put('/links/:id', auth, LinkController.update);

module.exports = routes;
