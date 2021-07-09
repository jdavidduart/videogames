import React, {useEffect, useState} from 'react';
import './createVideogame.css'
import { useSelector, useDispatch} from "react-redux";
import {getPlatforms, postVideogame} from '../../actions/actions'
function CreateVideogame() {
    const genres = useSelector((store) => store.genres)
    const platforms = useSelector((store) => store.platforms)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({name:'', description:'', rating:'',released:''})
    const [genresCheck, setGenresCheck] = useState({}) 
    const [platformsCheck, setPlatformsCheck] = useState({}) 
    useEffect(() =>{
        if(platforms.length===0){
            dispatch(getPlatforms())
        }
    },[platforms.length, dispatch])

    const onChangeInputs = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const onChangeGenres = (e) =>{
        setGenresCheck({...genresCheck, [e.target.id]:e.target.checked})
    }
    const onChangePlatforms = (e) =>{
        setPlatformsCheck({...platformsCheck, [e.target.id]:e.target.checked})
    }

    const idsResults = (obj) =>{
        let array=[];
        // por cada objeto, creo array de [keys,values] y selecciono los que sean true
        Object.entries(obj).forEach( e => {
            if(e[1]===true) {
                array.push(e[0])
            }
        })
        return array
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        let obj=formData;
        obj.genreIds=idsResults(genresCheck)
        obj.platformIds=idsResults(platformsCheck)
        if(obj.name.length===0) alert('YOU MUST ENTER A NAME')
        else if(obj.description.length===0) alert('YOU MUST ENTER A DESCRIPTION')
        else if(obj.released.length===0) alert('YOU MUST ENTER A RELEASE DATE')
        else if(obj.rating.length===0) alert('YOU MUST ENTER A RATING')
        else if(obj.genreIds.length===0) alert('YOU MUST SELECT AT LEAST ONE GENDER')      
        else if(obj.platformIds.length===0) alert('YOU MUST SELECT AT LEAST ONE PLATFORM') 
        else{
            dispatch(postVideogame(obj))
        }
    }

    return(
        <div className='createContainer'>
            <div className='titleForm'>CREATION FORM</div>
            <form onSubmit={onSubmit} className='formCreate'>
                <div className='input_field'>
                    <label>Name:</label>
                    <input name='name' onChange={onChangeInputs} className='input'></input>
                </div>
                <div className='input_field'>
                    <label>Release date:</label>
                    <input name='released' onChange={onChangeInputs} className='input'></input>
                </div>
                <div className='input_field'>
                    <label>Raiting:</label>
                    <input name='rating' onChange={onChangeInputs} className='inputRating'></input>
                </div>
                
                <div className='input_field'>
                    <label>Description:</label>
                    <textarea name='description' onChange={onChangeInputs}></textarea>
                </div>
                <div className='input_field'>
                    <label>Poster Url</label>
                    <input name='background_image' onChange={onChangeInputs} className='input'></input>
                </div>
                <div className='genres_platforms'>
                    <div className='genresContainer'>
                    <p>Genres:</p>
                        {
                            genres?.map(genre =>(
                                <div key={genre.id}>
                                    <input type='checkbox' name={genre.name} onChange={onChangeGenres} id={genre.id}></input>
                                    <label htmlFor={genre.id}>{genre.name}</label>
                                </div>
                            ))
                        }
                    </div>
                    <div className='platforms_Container'>
                    <p>Platforms:</p>
                        <div  className='platforms_subContainer'>
                            {
                                platforms?.map(platform =>(
                                    <div key={platform.id}>
                                        <input type='checkbox' name={platform.name} onChange={onChangePlatforms} id={platform.id}></input>
                                        <label htmlFor={platform.id}>{platform.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button type='submit'>Create</button>

            </form>
        </div>
    )
}


  export default CreateVideogame;