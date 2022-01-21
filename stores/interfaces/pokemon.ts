import { PokeStat } from './pokeStat';
import { PokeType } from './pokeType';

export interface Pokemon {
	id: number;
	types: PokeType[];
	stats: PokeStat[];
	name: string;
	url: string;
}
