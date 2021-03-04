const router = require('express').Router();
const User = require('../db/models/user');
const { authenticated } = require('./middleware');

module.exports = router;
