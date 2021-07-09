const { Platform } = require('../db.js');
const ModelCrud = require('./index');

class PlatformModel extends ModelCrud{
    constructor(model){
        super(model);
    }
    getAll = (req, res, next) =>{
        this.model.findAll()
        .then(results => res.send(results))
        .catch( error => next(error))
    }
}


const platformController = new PlatformModel (Platform)

module.exports = platformController;