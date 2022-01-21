import axios from 'axios';
import create from 'zustand';
import { filterByName, isEmpty, sortById } from '../_helpers';
import { Pokemon } from './interfaces/pokemon';
import { usePokebeltStore } from './pokebelt.store';

type PokeDex = {
	loadingPokemon: boolean;
	error: string;
	allPokemon: Pokemon[];
	filteredResults: Pokemon[];
	searchQuery: string;
	showAll: boolean;
	getAllPokemon: () => Promise<Pokemon[]>;
	searchPokemonByName: () => void;
	catchPokemon: (id: number) => void;
};

export const usePokedexStore = create<PokeDex>((set) => ({
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
const getAllPokemon = async (set: any): Promise<Pokemon[]> => {
	set({ loadingPokemon: true });
	let pokemons: Pokemon[] = [];
	try {
		const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=250');
		if (res.status === 200) {
			const results = await res.data.results;
			await Promise.all(
				results.map(async (pokemon: Pokemon) => {
					const pokeData = await getPokeData(pokemon);
					pokemons.push(pokeData);
				})
			);
			pokemons = sortById(pokemons);
			set({ loadingPokemon: false, error: '', allPokemon: pokemons });
		}
		return pokemons;
	} catch (Error: any) {
		// Something went wrong. reset load and return
		console.log('Something went wrong', Error.message);
		set({ loadingPokemon: false, error: Error?.response ? Error?.response?.data : Error?.message });
		return pokemons;
	}
};

/**
 * @method
 * @name getPokeData
 * @description a function for collecting data from a specific pokemon
 * @param {object} pokemon
 * @returns {object} pokemon data
 */
const getPokeData = async (pokemon: Pokemon): Promise<Pokemon> => {
	let pokeData: any = {};
	try {
		const res = await axios.get(pokemon.url);
		if (res.status === 200) {
			pokeData = res.data;
		}
	} catch (Error: any) {
		// Something went wrong. reset load and return
		console.log('Something went wrong', Error.message);
	}
	return pokeData;
};

/**
 * @method
 * @name searchPokemonByName
 * @description a function for searching in the pokedex for a specific pokemon
 * @param {}
 * @returns void
 */
const searchPokemonByName = (set: any) => {
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
const catchPokemon = (id: number) => {
	let ownedPokemonIds = usePokebeltStore.getState().ownedPokemonIds;
	usePokebeltStore.setState({ ownedPokemonIds: [...ownedPokemonIds, id] });
};
