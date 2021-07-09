function totalResults(myVideogames, apiVideogames, res, page, searched, next) {
    Promise.all([myVideogames, apiVideogames])
        .then( results =>{
            const [myVideogameResults, apiVideogamesResults] = results;
            let response;
            if(!page || page==='1'){response = myVideogameResults.reverse().concat(apiVideogamesResults.data.results)}
            else{ response = apiVideogamesResults.data.results}
            //const finalData = response.slice(0,15)
            const finalData=response;
            if((apiVideogamesResults.next !== null) && searched){
                if(!page){
                    return res.send({
                        count:apiVideogamesResults.data.count,
                        next:"localhost:3001/videogames?name=" + searched + '&page=2',
                        results: finalData
                    })
                }
                return res.send({
                    count:apiVideogamesResults.data.count,
                    next:"localhost:3001/videogames?name=" + searched + '&page=' + (parseInt(page) + 1),
                    results: finalData   
                })
            }
            if(apiVideogamesResults.next !== null && !searched){
                if(!page){
                    return res.send({
                        count:apiVideogamesResults.data.count,
                        next:"localhost:3001/videogames" + '?page=2',
                        results: finalData
                    })
                }
                return res.send({
                    count:apiVideogamesResults.data.count,
                    next:"localhost:3001/videogames" + '?page=' + (parseInt(page) + 1),
                    results: finalData   
                })
            }        

        })
        .catch( error => next(error))
}

module.exports = totalResults
