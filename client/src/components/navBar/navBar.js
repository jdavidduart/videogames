import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import './navBar.css'
import { BsSearch } from 'react-icons/bs';
import {searchResults} from '../../actions/actions'
import { useHistory, Link } from 'react-router-dom';

function NavBar() {
    const [searched, setSearched] = useState('')
    const dispatch = useDispatch()
    const history = useHistory();

    const onChange = (e) =>{
        setSearched(e.target.value)
    } 

    const onSubmit = (e) => {
        e.preventDefault()
        if(searched !== ''){
            dispatch(searchResults(searched))
            history.push('/home/searchResults')
            setSearched('')
        }  
        
    }

    const resetInput = () => {
        setSearched('')
    } 

    return(
        <nav className='navBar'>
            <div className='home-Create'>
                <div/>
                <Link to='/home' onClick={resetInput} className='homeText'><div>Home</div></Link>
                <Link to='/home/createVideogame' className='createText'><div>Create Videogame</div></Link>
            </div>
            <form onSubmit={onSubmit}>
                <input
                    className='searchInput'
                    placeholder='What are you looking for?'
                    onChange={onChange}
                    value={searched || ''}
                >
                </input>
                <button type='submit' className='searchIcon'><BsSearch color='black' size='18px' /></button>   
            </form>
            <div/>
            <div/>
        </nav> 

    )
}

export default NavBar;