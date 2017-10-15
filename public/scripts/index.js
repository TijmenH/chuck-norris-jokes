import JokesHandler from './components/jokes/jokesHandler.js';
import FavouritesHandler from './components/favourites/favouritesHandler.js';

document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('.random-jokes')) {
		new JokesHandler();
	}

	if (document.querySelector('.favourite-jokes')) {
		new FavouritesHandler();
	}
});
