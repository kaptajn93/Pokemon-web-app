import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { usePokedexStore } from '../stores/pokedex.store';

const { Search } = Input;

const SearchBar = () => {
	const onSearch = (searchQuery) => {
		usePokedexStore.setState({ searchQuery });
		usePokedexStore.getState().searchPokemonByName();
	};
	return <Search style={{ width: '650px' }} placeholder='Search for a pokemon' enterButton='Search' size='large' onSearch={onSearch} />;
};

export default SearchBar;
