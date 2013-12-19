
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var lyrics = require('./lyricsapi');
var youtube = require('./youtube');

app.set('port', process.env.PORT || 3040);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/search', function(req, res) {
	var searchString = req.query.q
	console.log('search string is ' + searchString);
	lyrics.search(searchString, function(data) {
		res.send(data);
	})
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function(socket) {
   console.log('connected');
});

app.get('/yt', function(req, res) {
	var searchString = req.query.q
	youtube.search(searchString, function(data) {
		res.send(data);
	})
})

// lyrics.search('The mistery of love belongs to you', function(results) {
// 	console.log('Found ' + results.length + ' Results');
// 	for (var i = 0; i < results.length; i++) {
// 		var result = results[i];
// 		console.log(result.artist.name + ' : ' + result.title);
// 	}	
// });