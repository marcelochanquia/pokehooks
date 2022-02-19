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


  /*La llamada a useEffect acepta una función como argumento. 
  Esta función se ejecuta por defecto cuando el componente se renderiza por primera vez, 
  y después cada vez que el componente se actualice.*/

  useEffect(()=>{
      setLoading(true)
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
