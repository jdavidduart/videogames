const { v4: uuidv4 } = require('uuid');
const {Genre, Platform} = require('../db')
const axios = require('axios')
const {URL_BASE, API_KEY} = require('../utils/constants');

class ModelCrud{
    constructor (model){
        this.model=model
    }
    getById = (req, res, next) =>{
        const id=req.params.id
        if(id.length === 36){
            return this.model.findAll({
                where:{
                id:id},
                include: [
                    {model: Genre, attributes:["id", "name"], through:{attributes:[]}},
                    {model: Platform, attributes:["id", "name"], through:{attributes:[]}},
                ]
            })
            .then( result => res.send(result[0]))
            .catch( error => next(error))
        }else{
            axios.get(URL_BASE + id + '?' + API_KEY)
            .then(response => res.send(response.data))
            .catch( error => next(error))
        }
    }
    add = (req, res, next) =>{
        const idVideoGame = uuidv4()
        const body=req.body
        const genreIds=req.body.genreIds
        const platformIds=req.body.platformIds
        return this.model.create({
            ...body,
            id: idVideoGame,
        })
        .then( createdVideogame => {
            res.send(createdVideogame)
            genreIds.forEach(genreId => {
                this.model.findByPk(idVideoGame)
                .then(videoGame =>  videoGame.addGenre(genreId))
            })
            platformIds.forEach(platformId => {
                this.model.findByPk(idVideoGame)
                .then(videoGame =>  videoGame.addPlatform(platformId))
            });

 
        })
        .catch( error => next(error))
    }
}

module.exports = ModelCrud;