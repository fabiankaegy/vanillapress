'use strict';

import { helper } from './helper';
import { navigation } from './components/navigation';

const view = {};

/**
 * Initialize View
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
view.init = function() {
	navigation.init();
}

/**
 * Wrapper function for clearing the main element
 */
view.clear = function() {
	helper.clearMain();
}

/**
 * Display all elements one after another with the excerpt and title as a link
 * @param  {Array} elements List of WP post / page objects
 */
view.showArchive = function( elements ) {
	elements.map( ( element ) => {
		const { id, type, title, slug, excerpt } = element;
		const articleElement = helper.createMarkup( id, title.rendered, slug, excerpt.rendered, type, '' );
		helper.getRoot().appendChild(articleElement);
	});
};

/**
 * Display a single article on the page 
 * @param  {Object} single WP post / page object
 */
view.showSingle = function( single ) {
	const { id, type, title, slug, content } = single;
	const articleElement = helper.createMarkup( id, title.rendered, slug, content.rendered, type, '', true );
	helper.getRoot().appendChild(articleElement);
};

/**
 * Display a single view with 404 error 
 * @param  {String} slug that will be displayed in the error message.
 */
view.show404 = function( slug ) {
	const articleElement = helper.createMarkup( 0, 'Something went Wrong', '404', `We were not able to find any content with the slug: ${slug}.`, 'error', '', true );
	helper.getRoot().appendChild(articleElement);
};

/**
 * Display all page links inside the main navigation
 * @param  {Array} pages list of WP pages objects
 */
view.showNavigation = function( pages ) {
	pages.map( ( page ) => { 
		const { id, type, title, slug, content } = page;
		const header = helper.getNav();
		const myLink = helper.createLink( `#${slug}`, title.rendered );
		header.appendChild( myLink );
	} );
};

export {
	view
};