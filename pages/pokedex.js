import { Spin } from 'antd';
import { useEffect } from 'react';
import PokemonCard from '../components/pokemonCard';
import { usePokedexStore } from '../stores/pokedex.store';
import { isEmpty } from '../_helpers/index';

/**
 * @page
 * @name Pokedex
 * @description a page displaying all pokemon and some information about them
 * @param {}
 * @returns jsx list of all pokemoncards
 */
const Pokedex = () => {
	const { getAllPokemon, pokemonResults, loadingPokemon } = usePokedexStore((state) => ({
		getAllPokemon: state.getAllPokemon,
		pokemonResults: state.pokemonResults,
		loadingPokemon: state.loadingPokemon,
	}));

	useEffect(() => {
		if (isEmpty(pokemonResults)) {
			getAllPokemon();
		}
	}, []);

	if (loadingPokemon) {
		return <Spin size='large' />;
	}
	return (
		<div>
			<h1>Pokedex</h1>
			<div className='pokemon-list'>
				{!isEmpty(pokemonResults) &&
					pokemonResults.map((pokemon, index) => {
						return <PokemonCard key={'pokemon-' + index} pokemon={pokemon} />;
					})}
			</div>
		</div>
	);
};

export default Pokedex;
