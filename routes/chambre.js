const express = require("express");
const router = express.Router();
const chambreCtrl = require('../controllers/chambre');

router.post('/', chambreCtrl.createChambre);
router.put('/:id', chambreCtrl.updateChambre);
router.delete('/:id', chambreCtrl.suppChambre);
router.get('/', chambreCtrl.affAllChambre);
router.get('/:id', chambreCtrl.affChambre);

module.exports = router;