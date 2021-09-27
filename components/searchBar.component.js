import { Input } from 'antd';
const { Search } = Input;

/**
 * @component
 * @name SearchBar
 * @description a component for inputting a search string.
 * @param {function} onSearch
 * @param {String} searchQuery
 * @param {function} onChange
 * @returns jsx search bar
 */
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
