const initialState = {
    allVideogames:[],
    searchResults:[],
    genres:[],
    platforms:[],
    videogameDetail:[],
    loading: false
}

function rootReducer(state = initialState, action) {
    if(action.type === 'GET_ALL_VIDEOGAMES'){
        return{
            ...state,
            allVideogames: action.payload
        }
    }
    if(action.type === 'SEARCH_RESULTS'){
        return{
            ...state,
            searchResults: action.payload
        }
    }
    if(action.type === 'GET_GENRES'){
        return{
            ...state,
            genres: action.payload
        }
    }
    if(action.type === 'GET_PLATFORMS'){
        return{
            ...state,
            platforms: action.payload
        }
    }
    if(action.type === 'GET_VIDEOGAME_DETAIL'){
        return{
            ...state,
            videogameDetail: action.payload
        }
    }
    if(action.type === "LOADING") {
        return {
          ...state,
          loading: action.payload
        };
    }
      
      return state

}

export default rootReducer;