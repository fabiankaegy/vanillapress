import { helper } from '../helper';
import { category } from './category';


const post = {};

post.init = async function( id, isSingle = false ) {
	const postData = await post.fetch( id );
	post.render( postData, isSingle );
}

post.fetch = function( postId ) {
	const response = fetch( `https://javascriptforwp.com/wp-json/wp/v2/posts/${postId}` )
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

post.render = async function( postData, isSingle ) {
	const { id, type, title, slug, content, excerpt, categories, tags, sticky, author, featured_media, comment_status, date_gmt } = postData;
	const articleElement = helper.createMarkup( id, title.rendered, slug, isSingle ? content.rendered : excerpt.rendered, type, '', isSingle );

	helper.getRoot().appendChild( articleElement );
}

// post.markup = function() {

// }

export { 
	post
};