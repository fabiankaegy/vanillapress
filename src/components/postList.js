import { helper } from '../helper';
import { post } from './post';
import { category } from './category';

const postList = {};

postList.init = async function() {
	const postsData = await postList.fetch( );
	postList.render( postsData )
}

postList.fetch = function() {
	const response = fetch( `https://javascriptforwp.com/wp-json/wp/v2/posts` )
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

postList.render = function( posts ) {
	posts.map( singlePost => {
		post.init( singlePost.id )
		category.init( singlePost.categories );
	} );
}

export {
	postList
};