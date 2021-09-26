import { Input } from 'antd';

const { Search } = Input;

const SearchBar = ({ onSearch, searchQuery, onChange }) => {
	return (
		<Search
			style={{ width: '650px' }}
			placeholder='Search for a pokemon'
			enterButton='Search'
			size='large'
			onSearch={onSearch}
			defaultValue={searchQuery}
			onChange={onChange}
		/>
	);
};

export default SearchBar;
