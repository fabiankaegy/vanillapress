import { helper } from '../helper';

const navigation = {};

navigation.init = async function() {
	const navigationData = await navigation.fetch();
	navigation.render( navigationData );
}

navigation.fetch = function() {
	const response = fetch( `https://javascriptforwp.com/wp-json/wp/v2/pages` )
		.then( function( response ) {
			if ( response.ok ) {
				return response.json();
			}
			else {
				throw `Response resulted in error ${response.status}`;
			}
		});
	return response;
};

navigation.render = function( navigationItems ) {
	navigationItems.map( navigationItem => {
		const { id, type, title, slug, content } = navigationItem;
		const header = helper.getNav();
		const myLink = helper.createLink( `#${slug}`, title.rendered );
		header.appendChild( myLink );
	} );
}

export {
	navigation
};