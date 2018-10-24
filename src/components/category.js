import { helper } from '../helper';

const category = {};

category.init = async function( categories ) {
	const categoryMarkupList = categories.map( async categoryId => {
		const categoryData = await category.fetch( categoryId );
		const categoryMarkup = category.render( categoryData );
		return categoryMarkup;
	} );
	return categoryMarkupList;
}

category.fetch = function( categoryId ) {
	const response = fetch( `https://javascriptforwp.com/wp-json/wp/v2/categories/${categoryId}` )
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

category.render = function( singleCategory ) {
	const { name, link } = singleCategory
	const markup = category.markup( name, link );
	return markup;
}

category.markup = function( name, href ) {
	const categoryElement = helper.create( 'span' );
	const categoryAnchor = helper.createLink( href, name );
	categoryElement.appendChild( categoryAnchor );
	return categoryElement;
} 

export {
	category
};