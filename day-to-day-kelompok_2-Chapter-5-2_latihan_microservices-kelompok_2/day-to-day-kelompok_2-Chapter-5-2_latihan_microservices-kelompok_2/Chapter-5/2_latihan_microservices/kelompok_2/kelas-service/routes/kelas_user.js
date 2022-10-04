const express = require('express');
const router = express.Router();
const c = require('../controllers/kelas_user');

router.post('/create', c.create);
router.get('/getall', c.getAll);
router.get('/getdetail/:id', c.getDetail);

module.exports = router;