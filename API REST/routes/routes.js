// routes/routes.js
const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');
const housesRoutes = require('./houses');

router.use('/users', usersRoutes);
router.use('/houses', housesRoutes);

module.exports = router;
