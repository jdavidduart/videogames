import React, { useState} from 'react';
import './searchResults.css'
import { useSelector} from "react-redux";
import Videogame from '../videogame/videogame';
import Pagination from '../pagination/pagination';
import Loading from '../loading/loading'

function SearchResults() {

    const searchResultsData = useSelector((store) => store.searchResults);
    const loading = useSelector((store) => store.loading);
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 15
   
      // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchResultsData.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if(loading){
        return (
            <div className='loadingContainer'>
                <Loading/>
            </div>
        ) 
    }else{
        return(
            <div className='fullResultsContainer'>
                <div className='resultsContainer'>
                    <div className='videogamesResults'>
                        {
                            currentPosts?.map( (videogame) => (
                                <div key={videogame.id}>
                                    
                                        <Videogame 
                                            name={videogame.name}
                                            background_image={videogame.background_image}
                                            genres={videogame.genres}
                                            id={videogame.id}
                                        />
                                    
                                </div>
                            ))
                        }
                    </div>
                    <Pagination postsPerPage={postsPerPage} totalPosts={searchResultsData.length} paginate={paginate}/>
                </div>
            </div>
    )
    }
}

export default SearchResults;