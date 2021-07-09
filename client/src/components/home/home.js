import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import './home.css'
import Videogames from '../videogames/videogames'
import Pagination from '../pagination/pagination';
import Loading from '../loading/loading'
function Home() {
    const allResults = useSelector((store) => store.allVideogames);
    const loading = useSelector((store) => store.loading);
    const genres = useSelector((store) => store.genres) 
    const [currentPage, setCurrentPage] = useState(1)
    const [states, setStates] = useState({currentInfo:allResults, prevInfo:[], filterByGenre:[]});
    const postsPerPage = 9;

    useEffect(() =>{
        
        setStates(state =>({...state, currentInfo:allResults}))
 
    },[allResults])
    
    const onChangeByGenre = (e) =>{
        paginate(1)
        if(e.target.value !== 'allGenres'){
            const arr=[];
            //busco en el store los generos que coincidan con el seleccionado y modifico la info actual
            allResults.forEach(videogame =>{
            const res = videogame.genres.filter(genre => genre.id === parseInt(e.target.value));
            if(res.length>0){arr.push(videogame)}
            })
            setStates({...states, currentInfo:arr, prevInfo:[]})
          
        }else{
            setStates({...states, currentInfo:allResults, prevInfo:[]})
        }
        document.getElementById("creationOptions").selectedIndex = "0";
    }
    const onChangeByCreation = (e) =>{
        const type=e.target.value
        setCurrentPage(1)
        if(type==='own'){
                // si hay info previa, filtro en dicha info
            if(states.prevInfo.length>0){
                const ownResults=states.prevInfo.filter(videogame => videogame.id.length===36)
                setStates({...states, currentInfo:ownResults})
            }else{
                //sino hay previa filtro en la actual
                const ownResults=states.currentInfo.filter(videogame => videogame.id.length===36)
                setStates({...states, currentInfo:ownResults, prevInfo:states.currentInfo})
                
            }

        }
        if(type==='existing'){
            if(states.prevInfo.length>0){
                const existingResults=states.prevInfo.filter(videogame => videogame.id >0)
                setStates({...states, currentInfo:existingResults})      
            }else{
                const existingResults=states.currentInfo.filter(videogame => videogame.id >0)
                setStates({...states, currentInfo:existingResults, prevInfo:states.currentInfo}) 
            }
        }
    }

    const orderDesAlp = ()=>{
        const data=states.currentInfo.sort((a, b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0
        })
        
        setStates({...states, currentInfo:data})
    }

    const orderAscAlp = ()=>{
        const data=states.currentInfo.sort((a, b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0
        })
        
        setStates({...states, currentInfo:data})
    }

    const orderDesRating = ()=>{
        const data=states.currentInfo.sort((a, b)=>{
            if(a.rating < b.rating) return 1;
            if(a.rating > b.rating) return -1;
            return 0
        })
        
        setStates({...states, currentInfo:data})
    }
    const orderAscRating = ()=>{
        const data=states.currentInfo.sort((a, b)=>{
            if(a.rating < b.rating) return -1;
            if(a.rating > b.rating) return 1;
            return 0
        })
        
        setStates({...states, currentInfo:data})
    }

    const orderByYear = ()=>{
        const byYear=states.currentInfo.sort((a,b) => {
            if(a.released < b.released) return 1;
            if(a.released > b.released) return -1;
            return 0
        })
        setStates({...states, currentInfo:byYear})
    }
    // obtengo los post actuales por pagina
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = states.currentInfo.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if(loading){
        return (
            <div className='loadingContainer'>
                <Loading/>
            </div>
        ) 
    }else{
        return(
            
            <div className='homeContainer'>
                <div className='gameContainer'>
                    <label>Filter by: </label>
                    <div className='filterContainer'>
                        <div className='caja'>
                            <select onChange={onChangeByGenre}>
                                <option value='allGenres'>Genre</option>
                                {
                                genres.map(genre => <option value={genre.id} key={genre.id}>{genre.name}</option>) 
                                }
                            </select> 
                        </div>
                        <div className='caja'>
                            <select onChange={onChangeByCreation} id='creationOptions'>
                                <option>Type creation</option>
                                <option value='own'>Own creation</option>
                                <option value='existing'>Existing</option>
                            </select>
                        </div>
                        <button onClick={orderDesAlp}>Order A-Z </button>
                        <button onClick={orderAscAlp}>Order Z-A </button>
                        <button onClick={orderDesRating}>Order Rating ↓</button>
                        <button onClick={orderAscRating}>Order Rating ↑</button>
                        <button onClick={orderByYear}>Order by year</button>
                    </div>
                    <Videogames currentPosts={currentPosts}/>
                    <Pagination postsPerPage={postsPerPage} totalPosts={states.currentInfo.length} paginate={paginate}/>
                </div>
            </div>
          
        )
    }
}

export default Home;