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
		this.fetchJokesTimerButton = document.querySelector('.random-jokes__timer-button');
		this.clearListLink = document.querySelector('.random-jokes__clear-list-link');
		this.errorEl = document.querySelector('.error');

		this.totalJokes = 0; // To keep track of the total amount of jokes in the list

		// Init event listeners
		this.addEventListeners();
	}

	addEventListeners() {
		this.fetchJokesButton
			.addEventListener('click', (e) => {
				this.clearList();
				this.fetchJokes(10);
			});
		this.fetchJokesTimerButton
			.addEventListener('click', (e) => {
				if (this.fetchJokesTimerButton.dataset.running === 'false') {
					this.startFetchTimer();
				} else {
					this.stopFetchTimer();
				}
			});
		this.clearListLink
			.addEventListener('click', (e) => {
				this.clearList();
			});
	}

	/**
	* @description
	* Fetches random jokes from an external api
	*
	* @param {number} n - The number of jokes to fetch
	*/
	fetchJokes(n) {
		this.totalJokes += n; // Add the amount of jokes fetched to the total jokes
		xmlHttpRequest('GET', `http://api.icndb.com/jokes/random/${n}`).then((jokes) => {
			this.addJokesToList(jokes);
		}).catch((err) => {
			this.totalJokes -= n;
			this.errorEl.innerHTML = 'Something went wrong fetching jokes, please try again!';
			console.error(err);
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
			<div class="random_jokes__joke joke-item">
				<p class="random_jokes__text" data-id=${joke.id}>${joke.joke}</p>
				<span class="random-jokes__add-to-favourite favourite-link" data-joke-id=${joke.id}>
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
		this.totalJokes = 0; // Reset total jokes
	}

	/**
	* @description
	* Starts a timer to fetch a joke every 5 seconds
	*
	*/
	startFetchTimer() {
		if (this.totalJokes < 10) {
			this.fetchJokesTimerButton.dataset.running = 'true';
			this.fetchJokes(1); // Add a joke immediately after the button is pressed
			this.timer = setInterval(() => { this.fetchTimedJoke() }, 5000);
		}
	}

	/**
	* @description
	* Callback of the timer function
	*
	*/
	fetchTimedJoke() {
		this.fetchJokes(1);
		if ((this.totalJokes) >= 10) { // Stop if there are more than 10 jokes
			this.stopFetchTimer();
			return;
		}
	}

	/**
	* @description
	* Function to clear the interval and stop fetching jokes
	*
	*/
	stopFetchTimer() {
		clearInterval(this.timer);
		this.fetchJokesTimerButton.dataset.running = 'false';
	}
}
