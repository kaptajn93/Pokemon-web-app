import { Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useEffect } from 'react';
import PokemonCard from '../components/pokemonCard.component';
import PokemonList from '../components/pokemonList.component';
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
	const { getAllPokemon, allPokemon, loadingPokemon, searchQuery, filteredResults, showAll, searchPokemonByName } = usePokedexStore((state) => ({
		getAllPokemon: state.getAllPokemon,
		allPokemon: state.allPokemon,
		loadingPokemon: state.loadingPokemon,
		searchQuery: state.searchQuery,
		filteredResults: state.filteredResults,
		showAll: state.showAll,
		searchPokemonByName: state.searchPokemonByName,
	}));

	useEffect(() => {
		if (isEmpty(allPokemon)) {
			getAllPokemon();
		}
	}, []);

	const onSearch = (searchQuery) => {
		usePokedexStore.setState({ searchQuery });
		searchPokemonByName();
	};

	const onSearchChange = (event) => {
		usePokedexStore.setState({ searchQuery: event.target.value });
	};

	const pokemons = showAll ? allPokemon : filteredResults;
	return (
		<div>
			<div className='pokedex-title-search'>
				<Title level={1}>Pokedex</Title>
				<SearchBar onSearch={onSearch} searchQuery={searchQuery} onChange={onSearchChange} />
			</div>
			<PokemonList pokemons={pokemons} />
		</div>
	);
};

export default Pokedex;
