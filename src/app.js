'use strict';

import { router } from './router';
import './style.scss';

const app = {};

/**
 * Initialize App
 */
app.init = function() {
	router.init();
};

/**
 * Initiating App
 */
app.init();

export {
	app
};