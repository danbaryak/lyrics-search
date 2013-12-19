var Client = require('node-rest-client').Client;

var client = new Client();
var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBSX561KbXCUW_23jHFoBd93nXHbKMY1Sk";

exports.search = function(query, cb) {
	client.get(url + "&type=video&part=snippet&q=" + query, function(data, response) {
		console.log(JSON.stringify(data));
		cb(JSON.parse(data));
	})
}
