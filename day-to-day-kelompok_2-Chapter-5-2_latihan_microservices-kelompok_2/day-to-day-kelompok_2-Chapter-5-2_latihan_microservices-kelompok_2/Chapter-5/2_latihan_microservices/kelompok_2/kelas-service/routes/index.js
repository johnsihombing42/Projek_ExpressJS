const express = require('express');
const router = express.Router();
const kelasuser = require('./kelas_user')
const kelas = require('./kelas')
const mentor = require('./mentor')

router.use('/kelasuser',kelasuser);
router.use('/kelas', kelas);
router.use('/mentor', mentor);

module.exports = router;