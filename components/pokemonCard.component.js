import Image from 'next/image';
import { Card, List, Button } from 'antd';
import { usePokebeltStore } from '../stores/pokebelt.store';
import { usePokedexStore } from '../stores/pokedex.store';
import { useEffect } from 'react';
const { Meta } = Card;

/**
 * @component
 * @name PokemonCard
 * @description a basic component for showing information about a pokemon
 * @param {pokemon}, object
 * @returns jsx antd card component with image and stats about the pokemon
 */
const PokemonCard = ({ pokemon, isBeltPage }) => {
	const { catchPokemon } = usePokedexStore.getState();
	const { releasePokemon, ownedPokemonIds } = usePokebeltStore((state) => ({
		releasePokemon: state.releasePokemon,
		ownedPokemonIds: state.ownedPokemonIds,
	}));

	const isOwned = ownedPokemonIds && ownedPokemonIds.find((id) => id === pokemon.id);

	const getActionButton = () => {
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
			style={{ minWidth: '400px', minHeight: '550px', margin: '16px' }}
			cover={<Image layout='responsive' width={400} height={300} alt={pokemon.name} src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} />}
		>
			<Meta title={pokemon.name} description={`Number: ${pokemon.id}`} />
			<List
				size='small'
				header={<strong>Type</strong>}
				dataSource={pokemon?.types}
				renderItem={(type) => {
					return <List.Item>{type.type.name}</List.Item>;
				}}
			/>

			<List
				size='small'
				header={<strong>Stats</strong>}
				dataSource={pokemon?.stats}
				renderItem={(stat) => {
					return (
						<List.Item>
							{stat.stat.name}:<p style={{ float: 'right' }}>{stat.base_stat}</p>
						</List.Item>
					);
				}}
			/>
			{getActionButton()}
		</Card>
	);
};

export default PokemonCard;
