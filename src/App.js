import React, { useState,useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';


function App() {

  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl,setCurrentPageUrl]=useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl,setNextPageUrl]=useState()
  const [prevPageUrl,setPrevPageUrl]=useState()
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
      setLoading(true)
      let cancel
      axios.get(currentPageUrl).then(res =>{
          setLoading(false)  
          setPrevPageUrl(res.data.previous)
          setNextPageUrl(res.data.next)
          setPokemon(res.data.results.map(p=>p.name))
          
  })
   
  },[currentPageUrl])

  function gotoNextPage() {
      setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
      setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
    //todo dentro de un fragmento
    <> 
      <PokemonList pokemon={pokemon}/>
      <Pagination 
        gotoNextPage ={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage ={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
