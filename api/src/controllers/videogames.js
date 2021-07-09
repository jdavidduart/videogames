const { Videogame, Genre, Platform } = require('../db.js');
const ModelCrud = require('./index');
const { Op } = require("sequelize");
const axios = require('axios')
const {URL_GAMES, SEARCH_URL, API_KEY} = require('../utils/constants')
const totalResults = require('../utils/extraFuntions')

class VideogameModel extends ModelCrud{
    constructor(model){
        super(model);
    }
    getAllVideogames = (req, res, next) =>{
        const searched = req.query.name;
        const page = req.query.page
        let myVideogames;
        let apiVideogames;
        if(searched){
            //encuentro todos los modelos que contengan dicha palabra
            myVideogames = this.model.findAll({
                where: {
                    name: {[Op.substring]: '%' + searched}
                },
                include: [
                    {model: Genre, attributes:["id", "name"], through:{attributes:[]}},
                    {model: Platform, attributes:["id", "name"], through:{attributes:[]}},
                ]

            })
            if(!page){
                apiVideogames = axios.get(SEARCH_URL + searched + '&' + API_KEY + '&page_size=40')
            }else{
                apiVideogames = axios.get(SEARCH_URL + searched + '&' + API_KEY + '&page=' + page + '&page_size=40')
            }
            
            totalResults(myVideogames, apiVideogames, res, page, searched, next)

        }else{
            myVideogames = this.model.findAll({
                include: [
                    {model: Genre, attributes:["id", "name"], through:{attributes:[]}},
                    {model: Platform, attributes:["id", "name"], through:{attributes:[]}},
                ]
            })
            if(!page){
                apiVideogames = axios.get(URL_GAMES + '&page_size=50')
            }else{
                apiVideogames = axios.get(URL_GAMES + '&page=' + page + '&page_size=50')
            }
           
            totalResults(myVideogames, apiVideogames, res, page, searched, next)
        }
    }
}

const videogameController = new VideogameModel (Videogame)

module.exports = videogameController;





