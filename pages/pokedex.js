import { Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useEffect } from 'react';
import PokemonCard from '../components/pokemonCard.component';
import SearchBar from '../components/searchBar.component';
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
	const { getAllPokemon, pokemonResults, loadingPokemon, searchQuery, filteredResults, showAll } = usePokedexStore((state) => ({
		getAllPokemon: state.getAllPokemon,
		pokemonResults: state.pokemonResults,
		loadingPokemon: state.loadingPokemon,
		searchQuery: state.searchQuery,
		filteredResults: state.filteredResults,
		showAll: state.showAll,
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
			<div className='pokedex-title-search'>
				<Title level={1}>Pokedex</Title>
				<SearchBar />
			</div>
			<div className='pokemon-list'>
				{showAll
					? pokemonResults.map((pokemon, index) => {
							return <PokemonCard key={'pokemon-' + index} pokemon={pokemon} />;
					  })
					: filteredResults.map((pokemon, index) => {
							return <PokemonCard key={'pokemon-' + index} pokemon={pokemon} />;
					  })}
			</div>
		</div>
	);
};

export default Pokedex;
