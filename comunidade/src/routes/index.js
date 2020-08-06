const { Router } = require('express');
const categoryRoutes = require('./category');
const postRoutes = require('./post');
const linkRoutes = require('./link');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const accountRoutes = require('./account');
const routes = Router();

routes.use(categoryRoutes);
routes.use(postRoutes);
routes.use(linkRoutes);
routes.use(authRoutes);
routes.use(userRoutes);
routes.use(accountRoutes);

module.exports = routes;
