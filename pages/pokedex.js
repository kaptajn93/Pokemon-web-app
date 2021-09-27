import Title from 'antd/lib/typography/Title';
import { useEffect } from 'react';
import PokemonList from '../components/pokemonList.component';
import SearchBar from '../components/searchBar.component';
import { usePokedexStore } from '../stores/pokedex.store';
import { isEmpty } from '../_helpers/index';

/**
 * @page
 * @name Pokedex
 * @description a page displaying all pokemon cards, info about them and the possibility to catch them (adding them to the belt)
 * @param {}
 * @returns jsx list of all pokemoncards
 */
const Pokedex = () => {
	const { getAllPokemon, allPokemon, searchQuery, filteredResults, showAll, searchPokemonByName } = usePokedexStore((state) => ({
		getAllPokemon: state.getAllPokemon,
		allPokemon: state.allPokemon,
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
