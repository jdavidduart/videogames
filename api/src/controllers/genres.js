const { Genre } = require('../db.js');
const ModelCrud = require('./index');

class GenreModel extends ModelCrud{
    constructor(model){
        super(model);
    }
    getAll = (req, res, next) =>{
        this.model.findAll()
        .then(results => res.send(results))
        .catch( error => next(error))
    }
}


const genreController = new GenreModel (Genre)

module.exports = genreController;