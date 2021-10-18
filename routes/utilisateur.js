const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/utilisateur');

router.post('/inscription', userCtrl.signup);
router.post('/connexion', userCtrl.login);

module.exports = router;