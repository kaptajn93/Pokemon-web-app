import { Spin } from 'antd';
import { useEffect } from 'react';
import PokemonCard from '../components/pokemonCard';
import { usePokedexStore } from '../stores/pokedex.store';
import { isEmpty } from '../_helpers/index';

const Pokedex = () => {
	const { getAllPokemon, pokemonResults, loadingPokemon, countUp, counter } = usePokedexStore((state) => ({
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
		<>
			<h1>Pokedex</h1>
			{!isEmpty(pokemonResults) &&
				pokemonResults.map((pokemon, index) => {
					return <PokemonCard key={'pokemon-' + index} pokemon={pokemon} />;
				})}
		</>
	);
};

export default Pokedex;
