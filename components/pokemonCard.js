import Image from 'next/image';
import { Card } from 'antd';
const { Meta } = Card;

/**
 * @component
 * @name PokemonCard
 * @description a basic component for showing information about a pokemon
 * @param {pokemon}, object
 * @returns jsx antd card component with image and stats about the pokemon
 */
const PokemonCard = ({ pokemon }) => {
	return (
		<Card
			hoverable
			style={{ minWidth: '400px', minHeight: '550px', margin: '16px' }}
			cover={<Image width={100} height={200} alt={pokemon.name} src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} />}
		>
			<Meta title={pokemon.name} />
			<p style={{ margin: 0 }}>
				<strong>Type:</strong>
			</p>
			<ul>
				{pokemon.types.map((type, index) => {
					return <li key={index}>{type.type.name}</li>;
				})}
			</ul>
			<p style={{ margin: 0 }}>
				<strong>Stats:</strong>
				<ul>
					{pokemon.stats.map((stat, index) => {
						return (
							<li key={index}>
								{stat.stat.name}: {stat.base_stat}
							</li>
						);
					})}
				</ul>
			</p>
		</Card>
	);
};

export default PokemonCard;
