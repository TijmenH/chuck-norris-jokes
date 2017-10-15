/**
* @description
* Handles the adding and removing jokes from the favourites list
*
*/
export default class FavouriteHandler {
	constructor() {
		this.jokeListEl = document.querySelector('.random-jokes__list');
		this.favouritesListEl = document.querySelector('.favourites-jokes__list');

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
		// Check if the joke wasn't added yet
		if (favoredJokes && favoredJokes.length > 0) {
			if (favoredJokes.find((joke) => joke.id === jokeId)) {
				console.log('Sorry, joke already favored'); // @TODO ERROR
				return;
			}
		}
		// Find the joke
		const joke = document.querySelector(`.random-jokes__joke [data-id="${jokeId}"]`);
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
	* Builds the dynamic joke element for the favourite jokes wrapper
	*
	* @param {string} joke - The joke
	* @param {number} jokeId - The id of the joke
	* @return {element} - HTML code of joke
	*/
	buildJokeEl(joke, jokeId) {
		return (`
			<div class="favourite-jokes__joke">
				<p data-id=${jokeId}>${joke}</p>
				<span class="favourite-jokes__remove-from-favourite" data-joke-id=${jokeId}>
					Remove from favourites
				</span>
			</div>
		`);
	}
}
