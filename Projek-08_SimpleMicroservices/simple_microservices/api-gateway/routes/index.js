const express = require('express');
const router = express.Router();
const c = require('../controllers');

router.post('/auth/register', c.register);
router.post('/auth/login', c.login);
router.get('/test', c.test);

module.exports = router;