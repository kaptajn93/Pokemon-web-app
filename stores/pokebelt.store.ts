import create from 'zustand';
import { filterByName, isEmpty, sortById } from '../_helpers';
import { Pokemon } from './interfaces/pokemon';
import { usePokedexStore } from './pokedex.store';

type PokeBelt = {
	loadingPokemon: boolean;
	error: string;
	ownedPokemonIds: number[]; // always starting with pikachu
	ownedPokemon: Pokemon[];
	filteredResults: Pokemon[];
	searchQuery: string;
	showAll: boolean;
	getOwnedPokemon: () => void;
	searchPokemonByName: () => void;
	releasePokemon: (id: number) => void;
};

export const usePokebeltStore = create<PokeBelt>((set) => ({
	loadingPokemon: false,
	error: '',
	ownedPokemonIds: [25], // always starting with pikachu
	ownedPokemon: [],
	filteredResults: [],
	searchQuery: '',
	showAll: true,
	getOwnedPokemon: () => getOwnedPokemon(set),
	searchPokemonByName: () => searchPokemonByName(set),
	releasePokemon: (id) => releasePokemon(id, set),
}));

/**
 * @method
 * @name getOwnedPokemon
 * @description a method for fetching owned pokemons the shared store.
 * @param {}
 * @returns void
 */
const getOwnedPokemon = async (set: any): Promise<void> => {
	set({ loadingPokemon: true });
	const { ownedPokemonIds } = usePokebeltStore.getState();
	let { allPokemon, getAllPokemon } = usePokedexStore.getState();
	if (isEmpty(allPokemon)) {
		allPokemon = await getAllPokemon();
	}
	let ownedPokemon = ownedPokemonIds.map((id) => {
		return allPokemon[id - 1];
	});
	ownedPokemon = sortById(ownedPokemon);
	set({ loadingPokemon: false, ownedPokemon });
};

/**
 * @method
 * @name searchPokemonByName
 * @description a function for searching in the pokebelt for a specific pokemon
 * @param {}
 * @returns void
 */
const searchPokemonByName = (set: any): void => {
	const { ownedPokemon, searchQuery } = usePokebeltStore.getState();
	if (!isEmpty(searchQuery)) {
		const filteredResults = filterByName(ownedPokemon, searchQuery);
		set({ filteredResults: filteredResults, showAll: false });
	} else {
		set({ filteredResults: [], showAll: true });
	}
};

/**
 * @method
 * @name releasePokemon
 * @description a method for removing a pokemon from your belt
 * @param {String} id of the pokemon
 * @returns void
 */
const releasePokemon = (id: number, set: any): void => {
	let { ownedPokemon, ownedPokemonIds } = usePokebeltStore.getState();
	//removing from pokemon array
	const ownedPokemonIndex = ownedPokemon.findIndex((pokemon) => pokemon.id === id);
	ownedPokemon.splice(ownedPokemonIndex, 1);

	//removing from pokemonId array
	const ownedPokemonIdsIndex = ownedPokemonIds.findIndex((pokemonId) => pokemonId === id);
	ownedPokemonIds.splice(ownedPokemonIdsIndex, 1);
	set({ ownedPokemon, ownedPokemonIds });
};
