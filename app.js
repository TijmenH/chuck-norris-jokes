const express = require('express');
const app = express();

// Static files directory
app.use(express.static('public'));

// Root route
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// Server
app.listen(3000, function () {
	console.log('App listening on port 3000');
});
