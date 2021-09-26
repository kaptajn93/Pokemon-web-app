import axios from 'axios';
import create from 'zustand';
import { filterByName, isEmpty, sortById } from '../_helpers';
import { usePokebeltStore } from './pokebelt.store';

export const usePokedexStore = create((set) => ({
	loadingPokemon: false,
	error: '',
	allPokemon: [],
	filteredResults: [],
	searchQuery: '',
	showAll: true,
	getAllPokemon: () => getAllPokemon(set),
	searchPokemonByName: () => searchPokemonByName(set),
	catchPokemon: (id) => catchPokemon(id),
}));

/**
 * @method
 * @name getAllPokemon
 * @description a method for fetching pokemon and set them in the shared store.
 * @param {}
 * @returns {array} list of all pokemons
 */
const getAllPokemon = async (set) => {
	set({ loadingPokemon: true });
	try {
		const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=250');
		if (res.status === 200) {
			const results = await res.data.results;
			let pokemons = [];
			await Promise.all(
				results.map(async (pokemon) => {
					const pokeData = await getPokeData(pokemon, set);
					pokemons.push(pokeData);
				})
			);
			pokemons = sortById(pokemons);
			set({ loadingPokemon: false, error: '', allPokemon: pokemons });
			return pokemons;
		}
	} catch (Error) {
		// Something went wrong. reset load and return
		console.log('Something went wrong', Error.message);
		set({ loadingPokemon: false, error: Error?.response ? Error?.response?.data : Error?.message });
	}
};

/**
 * @method
 * @name getPokeData
 * @description a function for collecting data from a specific pokemon
 * @param {object} pokemon
 * @returns {object} pokemon data
 */
const getPokeData = async (pokemon) => {
	try {
		const res = await axios.get(pokemon.url);
		if (res.status === 200) {
			return res.data;
		}
	} catch (Error) {
		// Something went wrong. reset load and return
		console.log('Something went wrong', Error.message);
	}
};

/**
 * @method
 * @name searchPokemonByName
 * @description a function for searching in the pokedex for a specific pokemon
 * @param {}
 * @returns void
 */
const searchPokemonByName = (set) => {
	const { allPokemon, searchQuery } = usePokedexStore.getState();
	if (!isEmpty(searchQuery)) {
		const filteredResults = filterByName(allPokemon, searchQuery);
		set({ filteredResults: filteredResults, showAll: false });
	} else {
		set({ filteredResults: [], showAll: true });
	}
};

/**
 * @method
 * @name catchPokemon
 * @description a method for adding a pokemon to your belt
 * @param {String} id of the pokemon
 * @returns void
 */
const catchPokemon = (id) => {
	let ownedPokemonIds = usePokebeltStore.getState().ownedPokemonIds;
	usePokebeltStore.setState({ ownedPokemonIds: [...ownedPokemonIds, id] });
};
