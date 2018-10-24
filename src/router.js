'use strict';

import { view } from './view';
import { post } from './components/post';
import { postList } from './components/postList';

const router = {};

/**
 * Initialize Router
 */
router.init = function() {
	router.listen();
	view.init();
	router.show();
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
		postList.init();
	} else {
		router.getContent( hash.substr(1) );
	};
};

/**
 * Filter Pages & Posts weather the slug is in them and calls the correct view
 * @param  {String} slug 
 */
router.getContent = function( slug ) {
	// if () {
	// 	post.init( matchedContent[0].id, true );
	// } else {
	// 	view.show404( slug );
	// }
};

export {
	router
};