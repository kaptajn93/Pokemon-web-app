import { Spin } from 'antd';
import { usePokebeltStore } from '../stores/pokebelt.store';
import { usePokedexStore } from '../stores/pokedex.store';
import { isEmpty } from '../_helpers';
import PokemonCard from './pokemonCard.component';

/**
 * @component
 * @name PokemonList
 * @description a component for displaying pokemon cards from a list of pokemon
 * @param {Array} pokemons
 * @param {Boolean} isBeltPage
 * @returns jsx list of pokemon cards
 */
const PokemonList = ({ pokemons, isBeltPage }) => {
	let loadingPokedex = usePokedexStore.getState().loadingPokemon;
	let loadingPokebelt = usePokebeltStore.getState().loadingPokemon;
	const isLoading = loadingPokedex || loadingPokebelt;
	return (
		<div className='pokemon-list'>
			{isLoading && <Spin size='large' />}
			{!isLoading && isEmpty(pokemons) ? (
				<p>No pokemons was found</p>
			) : (
				pokemons.map((pokemon, index) => {
					return <PokemonCard key={'pokemon-' + index} pokemon={pokemon} isBeltPage={isBeltPage} />;
				})
			)}
		</div>
	);
};

export default PokemonList;
