import axios from "axios"
export function loading(payload){
    return {
        type:"LOADING", payload: payload  
    }
}


var allResults = [];
async function getData(numPag, url){
    try {
        let resultGet = await axios.get(url + numPag) 
        allResults = allResults.concat(resultGet.data.results);
        const pageLimit=Math.ceil(resultGet.data.count/40)
        if(numPag <2 && numPag<pageLimit){
            return getData(numPag + 1, url);
        }
    } catch (error) {
        return allResults
    }
    
};

var allSearchResults = [];
async function getDataResults(numPag, url){
    try {
        let resultGet = await axios.get(url + numPag) 
        allSearchResults = allSearchResults.concat(resultGet.data.results);
        const pageLimit=Math.ceil(resultGet.data.count/40)
        if(numPag <2 && numPag<pageLimit){
            return getDataResults(numPag + 1, url);
        }
    } catch (error) {
        console.log('soy error')
    }
    
};

export function getAll() {
    return async function (dispatch) {
        try {
            allResults=[]
            dispatch(loading(true))
            await getData(1, 'http://localhost:3001/videogames?page=')
            dispatch({type: 'GET_ALL_VIDEOGAMES', payload: allResults})
            dispatch(loading(false))
        } catch (error) {
            console.error(error)
        }
    }
}

export function searchResults(name) {
    return async function (dispatch) {
        try {
            dispatch(loading(true))
            allSearchResults=[]
            await getDataResults(1, 'http://localhost:3001/videogames?name=' + name + '&page=')
            dispatch({type: 'SEARCH_RESULTS', payload: allSearchResults})
            dispatch(loading(false))
        } catch (error) {
            console.error(error)
        }
    }
}

export function getGenres() {
    return async function (dispatch) {
        try {
            const results = await axios.get('http://localhost:3001/genres')
            dispatch({type: 'GET_GENRES', payload: results.data})
            
        } catch (error) {
            console.error(error)
        }
    }
}


export function getPlatforms() {
    return async function (dispatch) {
        try {
            const results = await axios.get('http://localhost:3001/platforms')
            dispatch({type: 'GET_PLATFORMS', payload: results.data})
        } catch (error) {
            console.error(error)
        }
    }
}

export function postVideogame(payload) {
    return async function (dispatch) {
        try {
            
            await axios.post('http://localhost:3001/videogames', payload)
            dispatch(getAll())
            alert('Successfully created')
        } catch (error) {
            console.error(error)
        } 
    }
}

export function videogameDetail(id) {
    return async function (dispatch) {
        try {
            dispatch(loading(true))
            const details = await axios.get('http://localhost:3001/videogames/' + id)
            dispatch({type: 'GET_VIDEOGAME_DETAIL', payload: details.data})
            dispatch(loading(false))
        } catch (error) {
            console.error(error)
        }
    }
}


