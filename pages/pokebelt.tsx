import Title from 'antd/lib/typography/Title';
import { useEffect } from 'react';
import PokemonList from '../components/pokemonList.component';
import SearchBar from '../components/searchBar.component';
import { usePokebeltStore } from '../stores/pokebelt.store';

/**
 * @page
 * @name Pokedex
 * @description a page displaying all owned pokemon and some information about them
 * @param {}
 * @returns jsx list of all pokemoncards owned
 */
const Pokebelt = (): JSX.Element => {
	const { ownedPokemon, getOwnedPokemon, filteredResults, showAll, searchPokemonByName, searchQuery, ownedPokemonIds } = usePokebeltStore((state) => ({
		ownedPokemon: state.ownedPokemon,
		getOwnedPokemon: state.getOwnedPokemon,
		filteredResults: state.filteredResults,
		showAll: state.showAll,
		searchPokemonByName: state.searchPokemonByName,
		searchQuery: state.searchQuery,
		ownedPokemonIds: state.ownedPokemonIds,
	}));

	useEffect(() => {
		getOwnedPokemon();
	}, [ownedPokemonIds]);

	const onSearch = () => {
		searchPokemonByName();
	};
	const onSearchChange = (event: any) => {
		usePokebeltStore.setState({ searchQuery: event.target.value });
	};

	const pokemons = showAll ? ownedPokemon : filteredResults;
	return (
		<div>
			<div className='pokedex-title-search'>
				<Title level={1}>Pokebelt</Title>
				<SearchBar onSearch={onSearch} searchQuery={searchQuery} onChange={onSearchChange} />
			</div>
			<PokemonList pokemons={pokemons} isBeltPage={true} />
		</div>
	);
};

export default Pokebelt;
