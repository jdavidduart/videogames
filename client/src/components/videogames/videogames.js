import React from 'react';
import Videogame from '../videogame/videogame'
import './videogames.css'
function Videogames({currentPosts}) {
 
    return(
        
        <div className='videogamesContainer'>
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
    )
}

export default Videogames;