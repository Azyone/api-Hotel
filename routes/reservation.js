const express = require("express");
const router = express.Router();
const reservationCtrl = require('../controllers/reservation');
const auth = require('../middleware/auth');

router.post('/', auth, reservationCtrl.ajoutResa);
router.get('/', auth, reservationCtrl.affAllReservation);
router.get('/:id', auth, reservationCtrl.affReservation);
router.delete('/:id', auth, reservationCtrl.supp);

module.exports = router;