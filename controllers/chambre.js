const Thing = require('../models/Thing');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fs = require('fs');


exports.createChambre = ('/', auth, multer, (req,res,next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

exports.updateChambre = ('/:id', auth, multer, (req, res, next) => {
    Thing.findById(req.params.id)
        .then(thing => {
            let test  = JSON.parse(req.body.thing)
            //console.log(test,thing)
            if (thing.userId == test.userId){
                const thingObject = req.file ? {
                ...JSON.parse(req.body.thing),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({ error }));
            }else{
                res.status(400).json({ mess:'Utilisateur incorrect' });
            }
        })
});

exports.suppChambre = ('/:id', auth, (req, res, next) => {
    Thing.findById(req.params.id)
        .then(thing => {
            console.log(thing, req.userId)
            if (thing.userId == req.userId){
                Thing.findOne ({ _id: req.params.id })
                    .then( thing => {
                        const filename = thing.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                        Thing.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Deleted!'}))
                            .catch(error => res.status(400).json({ error }));
                        })
                    }
                    )
                    .catch(error => res.status(500).json({ error }));
            }else{
                res.status(400).json({ mess:'Utilisateur incorrect' });
            }
        })
});

exports.affChambre = ('/:id', auth, (req,res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
});

exports.affAllChambre = ('/', auth, (req, res, next) => {
Thing.find()
.then(things => res.status(200).json(things))
.catch(error => res.status(400).json({ error }));
});
