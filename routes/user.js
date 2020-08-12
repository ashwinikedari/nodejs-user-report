var express = require('express');
var routes = express.Router();

routes.use('/user', require('../controller/user'));

module.exports = routes;