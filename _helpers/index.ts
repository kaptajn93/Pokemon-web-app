/**
 * @name wait
 * @description
 * @param {number} ms the amount of time to wait
 * @returns {Promise} the promise is returned
 */
export const wait = async (ms: number): Promise<unknown> => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}; // wait()

/**
 * @name isEmpty
 * @description evaluates whether an array, object or string is empty
 * @param {any} value the input value
 * @returns {boolean} is the input value empty?
 */
export const isEmpty = (value: any): boolean => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
}; // isEmpty()

/**
 * @method
 * @name filterByName
 * @description filtering a list by checking if an item item.name includes the given name
 * @param {Array} filterFrom
 * @param {String} name to filter by
 * @returns {Array} filtered list
 */
export const filterByName = (filterFrom: any, name: string): Array<any> => {
	return filterFrom.filter((item: any) => {
		return item.name.includes(name);
	});
};

/**
 * @method
 * @name sortById
 * @description sorting a list by item.id, returning lowest to highest id's
 * @param {Array} list to sort
 * @returns {Array} sorted list
 */
export const sortById = (list: any): Array<any> => {
	list.sort(function (a: any, b: any) {
		return a.id - b.id;
	});
	return list;
};
