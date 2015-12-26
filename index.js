// load deps
var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');

var util = require('util');

// express app stuff
var app = express();
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// default to azat's story
var user = 'azat_co';
var story_slug = 'node-interactive-2015';


// currently unrequired because the api is public,
// but auth requirements might change
var api_key = '567e304bc67b6af44e209318';
var username  = '';
var _token = '';


// home route
app.get('/', function(req, res){
	superagent
	.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug)
	.query({api_key  : api_key,
			username : username,
			_token   : _token})
	.set({Accept: 'application/json'})
	.end(function(e, storifyResponse){
		if (e) return next(e);

		// console.dir('got a storifyResponse: ');
		console.log(util.inspect(storifyResponse.body.content, false, null));
		return res.render('index', storifyResponse.body.content);	
	});


});

app.listen(3000, console.log("listening at port 3000!"))