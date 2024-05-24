import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PokemonList () {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchWeakness, setSearchWeakness] = useState('');

  useEffect(() => {
      fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setPokemonData(data.pokemon);
        })
        .catch((error) => {
          console.log(error);
        })
  }, []);
    
    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (searchType === '' || pokemon.type.includes(searchType)) && 
      (searchWeakness === '' || pokemon.weaknesses.includes(searchWeakness))
    );
    
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    
    const handleTypeChange = (event) => {
      setSearchType(event.target.value);
    };
    
    const handleWeaknessChange = (event) => {
      setSearchWeakness(event.target.value);
    };

    return (
        <div>
            <h1>List of Pokemon Characters</h1>
            <input
                type="text"
                placeholder="Search Pokemon"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={searchType} onChange={handleTypeChange}>
                <option value="">Filter by Type</option>
                <option value="Bug">Bug</option>
                <option value="Dragon">Dragon</option>
                <option value="Electric">Electric</option>
                <option value="Fighting">Fighting</option>
                <option value="Fire">Fire</option>
                <option value="Flying">Flying</option>
                <option value="Ghost">Ghost</option>
                <option value="Grass">Grass</option>
                <option value="Ground">Ground</option>
                <option value="Ice">Ice</option>
                <option value="Normal">Normal</option>
                <option value="Poison">Poison</option>
                <option value="Psychic">Psychic</option>
                <option value="Rock">Rock</option>
                <option value="Water">Water</option>
            </select>
            <select value={searchWeakness} onChange={handleWeaknessChange}>
                <option value="">Filter by Weakness</option>
                <option value="Bug">Bug</option>
                <option value="Dark">Dark</option>
                <option value="Dragon">Dragon</option>
                <option value="Electric">Electric</option>
                <option value="Fairy">Fairy</option>
                <option value="Fighting">Fighting</option>
                <option value="Fire">Fire</option>
                <option value="Flying">Flying</option>
                <option value="Ghost">Ghost</option>
                <option value="Grass">Grass</option>
                <option value="Ground">Ground</option>
                <option value="Ice">Ice</option>
                <option value="Normal">Normal</option>
                <option value="Poison">Poison</option>
                <option value="Psychic">Psychic</option>
                <option value="Rock">Rock</option>
                <option value="Steel">Steel</option>
                <option value="Water">Water</option>
            </select>
            <ul>
                {filteredPokemon.map((pokemon) => {
                  return <li key={pokemon.id}>
                    <div className="pokemon-card">
                      <Link to={`/pokemon/${pokemon.id}`} >
                        <img src={pokemon.img} alt={`${pokemon.name}`}/>
                        <h2>{pokemon.name}</h2>
                      </Link>
                      <p>Number: {pokemon.num}</p>
                      <p>Type: {pokemon.type.join(', ')}</p>
                      <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
                    </div>
                  </li>
                })}
            </ul>
        </div>
    );
}

export default PokemonList;