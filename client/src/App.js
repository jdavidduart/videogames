import './App.css';
import { Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar"
import Home from "./components/home/home"
import React, {useEffect} from 'react';
import LandingPage from './components/landingPage/landingPage';
import SearchResults from './components/searchResults/searchResults';
import CreateVideogame from './components/createVideogame/createVideogame';
import VideogameDetail from './components/videogameDetail/videogameDetail'
import {useDispatch} from "react-redux"
import { getAll, getGenres } from './actions/actions';

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getGenres())
    dispatch(getAll())   
  },[dispatch])



  return (
    <React.Fragment>
      <Route
        exact path='/'
        component={LandingPage}
      />
      <Route
        path='/home'
        component={NavBar}
      />
      <Route
        exact path='/home'
        component={Home}
      />
      <Route
        exact path='/home/searchResults'
        component={SearchResults}
      />
      <Route
        exact path='/home/createVideogame'
        component={CreateVideogame}
      />
      <Route
        exact path='/home/videogame/:id'
        component={VideogameDetail}
      />

    </React.Fragment>
  );
}

export default App;
