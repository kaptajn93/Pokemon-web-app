import axios from 'axios';
import { Pokemon } from '../../../stores/interfaces/pokemon';


/**
 * @method
 * @name getAllPokemon
 * @description a method for fetching pokemon and set them in the shared store.
 * @param {}
 * @returns {array} list of all pokemons
 * .
 */
export const getAllPokemon = async (limit: number = 250): Promise<Pokemon[]> => {
	let pokemons: Pokemon[] = [];
	try {
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
		if (res.status === 200) {
			pokemons = await res.data.results;
		}
	} catch (Error: any) {
		// Something went wrong. reset load and return
		console.log('Something went wrong', Error.message);
	}
		return pokemons;

};

/**
 * @method
 * @name getPokeData
 * @description a function for collecting data from a specific pokemon
 * @param {object} pokemon
 * @returns {object} pokemon data
 */
export const getPokeData = async (pokemon: Pokemon): Promise<Pokemon> => {
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
