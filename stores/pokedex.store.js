import axios from 'axios';
import create from 'zustand';

export const usePokedexStore = create((set) => ({
	loadingPokemon: false,
	error: '',
	pokemonResults: [],
	getAllPokemon: () => getAllPokemon(set),
}));

/**
 * @method
 * @name getAllPokemon
 * @description a method for fetching pokemon and set them in the shared store.
 * @param {}
 * @returns void
 */
const getAllPokemon = async (set) => {
	set({ loadingPokemon: true });
	try {
		const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=250');
		console.log(res);
		if (res.status === 200) {
			const results = await res.data.results;
			let pokemons = [];
			await Promise.all(
				results.map(async (pokemon) => {
					const pokeData = await getPokeData(pokemon, set);
					pokemons.push(pokeData);
				})
			);
			pokemons.sort(function (a, b) {
				return a.id - b.id;
			});
			console.log(pokemons[1]);
			set({ loadingPokemon: false, error: '', pokemonResults: pokemons });
		}
	} catch (Error) {
		// Something went wrong. reset load and return
		console.log('Something went wrong', Error.message);
		set({ loadingPokemon: false, error: Error?.response ? Error?.response?.data : Error?.message });
	}
};

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
