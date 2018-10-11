'use strict';

import { data } from './data';
import { view } from './view';

const router = {};

/**
 * Initialize Router
 * @return {[type]} [description]
 */
router.init = async function() {
	await data.init( 'https://javascriptforwp.com/wp-json/wp/v2/' );
	router.listen();
	view.init( data );
};

/**
 * Listen for Hash changes in the browser
 */
router.listen = () => window.addEventListener( 'hashchange', router.show , false );

/**
 * Call view based on the Hash
 */
router.show = function() {
	view.clear();
	const hash = window.location.hash;
	if (hash === '') {
		view.showArchive( data.posts );
	} else {
		router.getContent( hash.substr(1) );
	};
};

/**
 * Filter Pages & Posts weather the slug is in them and calls the correct view
 * @param  {String} slug 
 */
router.getContent = function( slug ) {
	const { pages, posts } = data;
	const matchedPosts = posts.filter( post => post.slug === slug );
	const matchedPages = pages.filter( page => page.slug === slug );
	if (matchedPosts[0]) {
		view.showSingle( matchedPosts[0] );
	} else if (matchedPages[0]) {
		view.showSingle( matchedPages[0] );
	} else {
		view.show404( slug );
	}
};

export {
	router
};