const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');


const reservationSchema = mongoose.Schema({
    userId : { type: String, required: true},
    chambreId : { type: String, required: true},
    prix : { type: String, required: true},
    dateDebut : { type: Date, required: true},
    dateFin : { type: Date, required: true},
});

reservationSchema.plugin(unique);

module.exports = mongoose.model('Reservation', reservationSchema);