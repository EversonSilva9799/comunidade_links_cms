const { Router } = require('express');
const categoryRoutes = require('./category');
const postRoutes = require('./post');
const linkRoutes = require('./link');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const routes = Router();

routes.use(categoryRoutes);
routes.use(postRoutes);
routes.use(linkRoutes);
routes.use(authRoutes);
routes.use(userRoutes);

module.exports = routes;
