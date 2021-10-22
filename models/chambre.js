const mongoose = require('mongoose');
const thingSchema = mongoose.Schema({
    prix: { type: Number, required: true},
    description: { type: String, required: true},
    nom: { type: String, required: true},
    place: { type: Number, required: true},
    gamme: { type: String, required: true},
    image: { type: String}
});

module.exports = mongoose.model('Chambre', thingSchema);