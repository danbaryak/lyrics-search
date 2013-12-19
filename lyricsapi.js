var Client = require('node-rest-client').Client;

var client = new Client();

var url = "http://api.lyricsnmusic.com/songs?api_key=8baf3d3c7d846f230935aceb3e84ed";

client.registerMethod("search", url, "GET");

exports.search = function(query, cb) {
	client.get(url + "&q=" + query, function(data, response) {
		cb(JSON.parse(data));
	})
}
