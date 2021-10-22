const Chambre = require('../models/chambre');
const fs = require('fs');


exports.createChambre = ( (req,res,next) => {
    delete req.body._id;
    console.log(req.file,req.body);
    const chambre = new Chambre({
        ...req.body,
        image : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    chambre.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

exports.updateChambre = (req, res, next) => {
    Chambre.findById(req.params.id)
        .then(chambre => {
                const chambreObject = req.file ? {
                ...req.body,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };
                Chambre.updateOne({ _id: req.params.id }, { ...chambreObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({ error }));
        })
};

exports.suppChambre = (req, res, next) => {
    console.log(req.params)
    Chambre.findById(req.params.id)
        .then( chambre => {
    //        console.log(req.params)
    //        res.status(200).json({ message: 'Deleted!'})
            const filename = chambre.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            Chambre.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Deleted!'}))
                .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(503).json({ error }));
};

exports.affChambre = ((req,res, next) => {
    Chambre.findOne({_id: req.params.id})
    .then(chambre => res.status(200).json(chambre))
    .catch(error => res.status(400).json({ error }));
});

exports.affAllChambre = ((req, res, next) => {
Chambre.find()
.then(chambre => res.status(200).json(chambre))
.catch(error => res.status(400).json({ error }));
});
