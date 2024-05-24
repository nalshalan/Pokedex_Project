import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function PokemonDetails() {
    let { id } = useParams();
    const parsedId = parseInt(id);
    console.log(parsedId);

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            .then((response) => response.json())
            .then((data) => {
                const selectedPokemon = data.pokemon.find(pokemon => pokemon.id === parsedId);
                if (selectedPokemon) {
                    setPokemon(selectedPokemon);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [parsedId]);

    if (!pokemon) {
        return <div>Loading...</div>
    }

    return (
        <div className="pokemon-details">
            <Link to="/">Back to Pokemon List</Link>
            <img src={pokemon.img} alt={pokemon.name} />
            <h2>{pokemon.name} Details</h2>
            <p>Id: {pokemon.id}</p>
            <p>Number: {pokemon.num}</p>
            <p>Type: {pokemon.type.join(', ')}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Candy: {pokemon.candy}</p>
            <p>Egg: {pokemon.egg}</p>
            <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
        </div>
    );
}

export default PokemonDetails;