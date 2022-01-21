import Image from 'next/image';
import { Card, List, Button } from 'antd';
import { usePokebeltStore } from '../stores/pokebelt.store';
import { usePokedexStore } from '../stores/pokedex.store';
import { Pokemon } from '../stores/interfaces/pokemon';
const { Meta } = Card;

type PokeCardProps = {
	pokemon: Pokemon;
	isBeltPage: boolean;
};
/**
 * @component
 * @name PokemonCard
 * @description a basic component for showing information about a pokemon
 * @param {pokemon}, object
 * @returns jsx antd card component with image and stats about the pokemon
 */
const PokemonCard = ({ pokemon, isBeltPage }: PokeCardProps): JSX.Element => {
	const { catchPokemon } = usePokedexStore.getState();
	const { releasePokemon, ownedPokemonIds } = usePokebeltStore((state: any) => ({
		releasePokemon: state.releasePokemon,
		ownedPokemonIds: state.ownedPokemonIds,
	}));
	const isOwned = ownedPokemonIds && ownedPokemonIds.find((id: number) => id === pokemon.id);

	/**
	 * @method
	 * @name getActionButton
	 * @description a method for rendering the "catch", "in belt" or "release" pokemon button.
	 * @param {}
	 * @returns jsx button with action
	 */
	const getActionButton = (): JSX.Element => {
		if (isOwned && isBeltPage) {
			return <Button onClick={() => releasePokemon(pokemon.id)}>Release</Button>;
		} else if (isOwned && !isBeltPage) {
			return (
				<Button onClick={() => null} disabled>
					In belt
				</Button>
			);
		} else {
			return <Button onClick={() => catchPokemon(pokemon.id)}>Catch</Button>;
		}
	};
	return (
		<Card
			hoverable
			// className='pokemon-card' // Card component do not take css className
			style={{ minWidth: '400px', minHeight: '550px', margin: '16px' }}
			cover={<img /*layout='responsive'*/ width={400} height={300} alt={pokemon.name} src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} />}
		>
			<Meta title={pokemon.name} description={`Number: ${pokemon.id}`} />
			<List
				size='small'
				header={<strong>Type</strong>}
				dataSource={pokemon?.types}
				renderItem={(type) => {
					return <List.Item>{type?.type?.name}</List.Item>;
				}}
			/>

			<List
				size='small'
				header={<strong>Stats</strong>}
				dataSource={pokemon?.stats}
				renderItem={(stat) => {
					return (
						<List.Item>
							{stat?.stat?.name}:<p style={{ float: 'right' }}>{stat?.base_stat}</p>
						</List.Item>
					);
				}}
			/>
			{getActionButton()}
		</Card>
	);
};

export default PokemonCard;
