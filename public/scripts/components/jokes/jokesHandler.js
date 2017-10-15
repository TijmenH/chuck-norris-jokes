import xmlHttpRequest from '../../utils/xmlHttpRequest.js';

/**
* @description
* Handles the fetching of 10 random jokes when clicking the button
*
*/
export default class JokeHandler {
	constructor() {
		this.jokesList = document.querySelector('.random-jokes__list');
		this.fetchJokesButton = document.querySelector('.random-jokes__fetch-button');

		// Init event listeners
		this.addEventListeners();
	}

	addEventListeners() {
		this.fetchJokesButton
			.addEventListener('click', (e) => {
				this.clearList();
				this.fetchJokes(10);
			});
	}

	/**
	* @description
	* Fetches random jokes from an external api
	*
	* @param {number} n - The number of jokes to fetch
	*/
	fetchJokes(n) {
		xmlHttpRequest('GET', `http://api.icndb.com/jokes/random/${n}`).then((jokes) => {
			this.addJokesToList(jokes);
		});
	}

	/**
	* @description
	* Adds the jokes to the list element
	*
	* @param {object} jokes - Object of jokes
	*/
	addJokesToList(jokes) {
		const jokeListEl = jokes.value.map((joke) => (`
			<div class="random-jokes__joke">
				<p data-id=${joke.id}>${joke.joke}</p>
				<span class="random-jokes__add-to-favourite" data-joke-id=${joke.id}>
					Add to favourites
				</span>
			</div>
		`)).join('');
		this.jokesList.innerHTML = this.jokesList.innerHTML + jokeListEl;
	}

	/**
	* @description
	* Clears the list with jokes
	*/
	clearList() {
		this.jokesList.innerHTML = '';
	}
}
