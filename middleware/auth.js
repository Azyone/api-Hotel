const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decode.userId;
        const type = decode.type;
        if (req.body.userId && req.body.userId !== userId){
            throw 'Utilisateur incorect !';
        }else{
            req.userId= userId
            req.typeUser= type
            next();
        }
    }
    catch (error){
        res.status(401).json({ error: error | 'Requête non authentifiée' })
    }
}