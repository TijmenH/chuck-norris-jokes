/**
* @description
* (very basic setup) performs an XMLHttpRequest
* @NOTE It's only set-up for GET requests
*
* @param {string} method - The method (GET, POST, ..)
* @param {string} path - The url to perform the XMLHttpRequest on
*
* @return {promise} - Promise which resolves when items are fetched
*/
export default function xmlHttpRequest(method, path) {
	return new Promise((resolve) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState === 4) {
				resolve(JSON.parse(xhttp.response));
			}
		};
		xhttp.open(method, path);
		xhttp.send();
	});
}
