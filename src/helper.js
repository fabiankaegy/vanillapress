'use strict';

const helper = {};

/**
 * Wrapper Function for querySelector
 * @param  {String} query
 * @return {DOMNode}
 */
helper.get = ( query ) => document.querySelector( query );

/**
 * Wrapper Function for helper.get to return the Root Element
 * @return {DOMNode}
 */
helper.getRoot = () => helper.get( '#main' );

/**
 * Wrapper Function for helper.get to return the header Element
 * @return {DOMNode}
 */
helper.getHeader = () => helper.get( '#site-header' );

/**
 * Wrapper Function for helper.get to return the main navigation Element
 * @return {DOMNode}
 */
helper.getNav = () => helper.get( '#site-navigation' );

/**
 * Sets the innerHTML of the passed DOMNode to ''.
 */
helper.clearElement = element => element.innerHTML = '';
/**
 * Wrapper Function for helper.clearElement to clear the Root Element.
 */
helper.clearMain = () => helper.clearElement(helper.getRoot());

/**
 * Wrapper function for document.createElement
 * @param  {String} type 
 * @return {DOMNode}
 */
helper.create = type => document.createElement(type);

/**
 * Wrapper function for document.createTextNode
 * @param  {String} text
 * @return {DOMTextNode}
 */
helper.createText = text => document.createTextNode(text);

/**
 * Creates link element
 * @param  {String} href            
 * @param  {String} text            
 * @param  {String} additionalClass 
 * @return {DOMNode}                 
 */
helper.createLink = ( href, text, additionalClass ) => {
	let linkEl, linkTextEl;

	linkEl = helper.create('a');
	linkTextEl = helper.createText(text);
	linkEl.setAttribute( 'href', href );
	if (additionalClass) {
		linkEl.classList.add(additionalClass);
	}
	linkEl.appendChild(linkTextEl);

	return linkEl;
};

/**
 * Creates article element
 * @param  {String}  id              
 * @param  {String}  title           
 * @param  {String}  slug            
 * @param  {String}  content         
 * @param  {String}  type            
 * @param  {String}  additionalClass 
 * @param  {Boolean} isSingle        
 * @return {DOMNode}                  
 */
helper.createMarkup = ( id, title, slug, content, type, additionalClass = '', isSingle = false) => {
	const articleElement = helper.create('article');
	articleElement.classList.add([type, additionalClass]);
	articleElement.setAttribute( 'id', id );
	const titleMarkup = ( isSingle ? `<h2>${title}</h2>` : `<h2><a href="#${slug}">${title}</a></h2>`);
	const markup = `
		<header class="entry-header">
			${titleMarkup}
		</header>
		<div class="entry-content">
			${content}
		</div>`;
	articleElement.innerHTML = markup;
	return articleElement;
};

export {
	helper
};