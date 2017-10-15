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
