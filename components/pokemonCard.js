import { Card } from 'antd';
const { Meta } = Card;

const PokemonCard = ({ pokemon }) => {
	return (
		<Card hoverable style={{ width: 240 }} cover={<img alt='example' src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} />}>
			<Meta title={pokemon.name} description='some description here' />
		</Card>
	);
};

export default PokemonCard;
