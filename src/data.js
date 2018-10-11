'use strict';

const data = {};

/**
 * Initialize Data
 * @param  {[type]} restBase 
 * @return {[type]}          
 */
data.init = async function (restBase) {
	const posts = await data.fetch(restBase, 'posts');
	const pages = await data.fetch(restBase, 'pages');
	const types = await data.fetch(restBase, 'types');
};

/**
 * Fetch data and Save it into object and local storage
 * @param  {String} restBase    
 * @param  {String} restEndpont 
 * @return {Promise}				Object with Status of the fetch Promise
 */
data.fetch = function (restBase, restEndpont) {
	const response = fetch(restBase + restEndpont)
		.then(function (response) {
			if (response.status >= 200 && response.status < 400) {
				return response.json();
			}
			else {
				throw `Response resulted in error ${response.status}`;
			}
		})
		.then(function (responseJson) {
			data.save(restEndpont, JSON.stringify(responseJson));
			data[restEndpont] = responseJson;
		});
	return response;
};

/**
 * Wrapper Function for saving to local storage
 * @param  {String} name  Will become the Key of the local storage item.
 * @param  {String} value Will become the parameter of the local storage item.
 */
data.save = (name, value) => {
	localStorage.setItem(name, value);
}

export {
	data
};