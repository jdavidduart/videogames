import React, {useEffect} from 'react';
import { useSelector, useDispatch} from "react-redux";
import { videogameDetail } from '../../actions/actions';
import './videogameDetail.css';
import ReactHtmlParser from 'react-html-parser';
import Loading from '../loading/loading'
import { RiStarFill } from "react-icons/ri";

function VideogameDetail({match}) {
    const videogame = useSelector((store) => store.videogameDetail);
    const loading = useSelector((store) => store.loading);
    const dispatch = useDispatch()
    const videogameId=match.params.id;

    useEffect(()=>{
        dispatch(videogameDetail(videogameId))
    },[dispatch, videogameId])

    if(loading){
        return (
            <div className='loadingContainer'>
                <Loading/>
            </div>
        ) 
    }else{
        return(
            <div className='fullContainer'>
                <div className='detailContainer'>
                    <div>
                        <h3 className='title'>{videogame.name}</h3>
                        <img className='poster' src={videogame.background_image} alt=''></img>
                    </div>
                    <div className='infoContainer'>
                        <div className='description'>
                            {ReactHtmlParser(videogame.description)}
                        </div>
                        <div className='extraInfo'>
                            <h4>Genres: 
                                <span className='noBold'>
                                    {
                                        videogame.genres?.map( (genre, index) => (
                                            <span key={index}> {index===videogame.genres.length-1? genre.name + '.' : genre.name + ','}</span>
                                        ))
                                    }
                                </span>
                            </h4>
                            <h4>Launch Date: <span className='noBold'>{videogame.released}</span></h4>
                            <h4>Platforms: 
                                <span className='noBold'>
                                    {
                                        videogame.platforms?.map( (platform, index) => (
                                            videogame.platforms[0].platform ?
                                            <span key={index}> {index===videogame.platforms.length-1? platform.platform.name + '.' : platform.platform.name + ','}</span>
                                            :
                                            <span key={index}> {index===videogame.platforms.length-1? platform.name + '.' : platform.name + ','}</span>
                                        ))
                                    }
                                </span>
                            </h4>
                            <p><RiStarFill size='30px' className='starRating'/><span className='textRating'>{videogame.rating}</span><span className='textRating2'>/5</span></p>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideogameDetail;