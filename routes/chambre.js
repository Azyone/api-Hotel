const express = require("express");
const router = express.Router();
const chambreCtrl = require('../controllers/chambre');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//const multer = require('multer')
//const upload = multer({ dest: '../images/' })
router.post('/', auth, multer, chambreCtrl.createChambre);
router.put('/:id', multer, chambreCtrl.updateChambre);
router.delete('/:id', chambreCtrl.suppChambre);
router.get('/', chambreCtrl.affAllChambre);
router.get('/:id', chambreCtrl.affChambre);

module.exports = router;