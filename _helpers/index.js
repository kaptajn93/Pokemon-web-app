/**
 * @name wait
 * @description
 * @param {number} ms the amount of time to wait
 * @returns {Promise} the promise is returned
 */
export const wait = async (ms) => {
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
export const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
}; // isEmpty()

export const getCookie = (cname) => {
	var name = cname + '=';
	if (process.browser) {
		var decodedCookie = document.cookie;
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	return '';
};

export const setCookie = (cname, cvalue, exdays) => {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const epocToDate = (epochDate) => {
	let date = new Date(0);
	date.setUTCSeconds(epochDate);
	return date;
};

export const diffDays = (endDate, startDate) => {
	const newStartDate = startDate || new Date();
	const diffInMs = endDate - newStartDate;
	return diffInMs / (1000 * 60 * 60 * 24);
};

/**
 * @method
 * @name UUID
 * @description generates a unique id
 * @returns {string} a unique UUID
 */
export const UUID = () => {
	let dt = new Date().getTime();
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		// eslint-disable-next-line no-bitwise
		const r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		// eslint-disable-next-line no-bitwise
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
	return uuid;
}; // UUID()
