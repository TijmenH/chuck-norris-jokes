import JokesHandler from './components/jokes/jokesHandler.js';

document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('.random-jokes')) {
		new JokesHandler();
	}
});
