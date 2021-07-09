import React from 'react';
import './videogame.css'
import { Link } from 'react-router-dom';
function Videogame(props) {
    return(
        <div>
            <Link to={`/home/videogame/${props.id}`} className='cardContainer'>
            <div className='titleGame'>{props.name}</div>
            <img className='imgPoster' src={props.background_image} alt=''></img>
            <div>
            <span className='text_white'>Genres: </span>
                {
                    props.genres?.map( (genre, index) => (
                        <span className='text_white' key={index}>{index===props.genres.length-1? genre.name + '.' : genre.name + ','} </span>
                    ))
                }
            </div>
            </Link>
        </div>
    )
}

export default Videogame;

