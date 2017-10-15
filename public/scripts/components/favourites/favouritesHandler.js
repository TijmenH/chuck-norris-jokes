/**
* @description
* Handles the adding and removing jokes from the favourites list
*
*/
export default class FavouriteHandler {
	constructor() {
		this.jokeListEl = document.querySelector('.random-jokes__list');
		this.favouritesListEl = document.querySelector('.favourites-jokes__list');
		this.errorEl = document.querySelector('.error');

		this.addEventListeners();
		this.checkFavoredJokes();
	}

	addEventListeners() {
		// Add event listener to the joke list, since the jokes are dynamically added
		this.jokeListEl
			.addEventListener('click', (e) => {
				// Make sure the add to favourite link was clicked
				if (e.target.classList.contains('random-jokes__add-to-favourite')) {
					const jokeId = e.target.dataset.jokeId;
					this.addToFavourites(jokeId);
				}
			});
		// Add event linstener to the favored joke list
		this.favouritesListEl
			.addEventListener('click', (e) => {
				if (e.target.classList.contains('favourite-jokes__remove-from-favourite')) {
					const jokeId = e.target.dataset.jokeId;
					this.removeFromFavourites(jokeId);
				}
			});
	}

	/**
	* @description
	* Checks local storage for favored jokes and if so puts them in the favorite list
	*
	*/
	checkFavoredJokes() {
		const favoredJokes = JSON.parse(localStorage.getItem('favoredJokes'));
		if (favoredJokes && favoredJokes.length > 0) {
			const jokeListEl = favoredJokes.map((joke) => this.buildJokeEl(joke.joke, joke.id)).join('');
			this.favouritesListEl.innerHTML = this.favouritesListEl.innerHTML + jokeListEl;
		}
	}

	/**
	* @description
	* Adds a joke to the favorite list after clicking the add favorite link
	*
	* @param {number} jokeId - The id of the joke
	*/
	addToFavourites(jokeId) {
		// Find all favourites from localstorage
		const favoredJokes = (localStorage.getItem('favoredJokes')) ? JSON.parse(localStorage.getItem('favoredJokes')) : [];
		// Check if the max isn't reached
		if (favoredJokes.length >= 10) {
			this.errorEl.innerHTML = 'You reached the max jokes you can favor!';
			this.errorEl.dataset.show = 'true';
			return;
		}
		// Check if the joke wasn't added yet
		if (favoredJokes && favoredJokes.length > 0) {
			if (favoredJokes.find((joke) => joke.id === jokeId)) {
				this.errorEl.innerHTML = 'You already favored this joke!';
				this.errorEl.dataset.show = 'true';
				return;
			}
		}
		// Find the joke
		const joke = document.querySelector(`.random_jokes__text[data-id='${jokeId}']`);
		if (!joke) return; // The joke couldn't be found in the list, do nothing
		// Save it to localstorage
		const newFavoredJoke = { id: jokeId, joke: joke.innerHTML };
		const updatedList = [...favoredJokes, newFavoredJoke];
		localStorage.setItem('favoredJokes', JSON.stringify(updatedList));
		// Build up html element for the joke
		const jokeEl = this.buildJokeEl(joke.innerHTML, jokeId);
		// Insert joke in favourite list
		this.favouritesListEl.innerHTML = this.favouritesListEl.innerHTML + jokeEl;
	}

	/**
	* @description
	* Removes a joke from the favorites list
	*
	* @param {number} jokeId - The id of the joke
	*/
	removeFromFavourites(jokeId) {
		const favoredJokes = JSON.parse(localStorage.getItem('favoredJokes'));
		// Add all jokes except the one with the supplied ID to a new array
		const updatedList = favoredJokes.filter((joke) => joke.id !== jokeId);
		// Update local storage
		localStorage.setItem('favoredJokes', [JSON.stringify(updatedList)]);
		// Update the rendered list
		const listToRender = updatedList.map((joke) => this.buildJokeEl(joke.joke, joke.id)).join('');
		this.favouritesListEl.innerHTML = listToRender;
	}

	/**
	* @description
	* Builds the dynamic joke element for the favourite jokes wrapper
	*
	* @param {string} joke - The joke
	* @param {number} jokeId - The id of the joke
	* @return {element} - HTML code of joke
	*/
	buildJokeEl(joke, jokeId) {
		return (`
			<div class="favourite-jokes__joke joke-item">
				<p data-id=${jokeId}>${joke}</p>
				<span class="favourite-jokes__remove-from-favourite favourite-link" data-joke-id=${jokeId}>
					Remove from favourites
				</span>
			</div>
		`);
	}
}
