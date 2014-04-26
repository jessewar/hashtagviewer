var express = require("express");
var Twit = require("twit");
var consolidate = require("consolidate");
var app = express();
var twitter = new Twit({
    consumer_key: 'H54AD1rVwqpELtpgvjkZTJLyd',
    consumer_secret: 'G6mMnu3WLoRB34wdZ73hT9CCvXUMlJF7OiZnLJs4JEnxwJE8SB',
    access_token: '60665636-kQs6rSi6YSl2QZ8sHs2JThXGsvXwWrlBeY1S4Llnd',
    access_token_secret: 'A1mMbEnPovAwJWMpjoVRraAPkHtYQSF7RGEeoJ00ePy2N'
});

// Specify pages directory as static
app.use(express.static(__dirname + "/pages"));
app.use(express.bodyParser());

// Stores a mapping from sessions to preferences.
var sessions = {};

app.get('/search/:query', function(req, res) {
    twitter.get('search/tweets', {q: '#' + req.params.query, count: 1}, function(err, reply) {
        console.log("Error: " + err);
        console.log("Reply: " + JSON.stringify(reply));
//	res.send(reply);

	var status = reply.statuses[0];
	var user = status.user;
	var parsedData = {
	    // status data
	    favorite_count : status.favorite_count,
	    created_at : status.created_at,
	    text : status.text,
	    geo : status.geo,
	    coordinates : status.coordinates,
	    // user data
	    name : user.name,
	    screen_name : user.screen_name,
	    location : user.location,
	    profile_image_url : user.profile_image_url
	};
	res.send(parsedData);
    });
});

// View the tweet board with the given session ID
app.get('/session/:sess_id', function(req, res) {
	if (sessions[req.params.sess_id] == undefined) {
		res.send('Session ID ' + req.params.sess_id + ' not found! :(');
	}
});

// View the admin page
app.get('/session/:sess_id/admin', function(req, res) {
	// Create if not already there
	if (sessions[req.params.sess_id] == undefined) {
		sessions[req.params.sess_id] = {};
	}

	res.sendfile(__dirname + "/pages/admin.html");
});

// Update the admin page information
app.post('/session/:sess_id/admin/save', function(req, res) {
	var prefs = {
		board_title: req.body.board_title
	};

	sessions[req.params.sess_id] = prefs;
	res.send(JSON.stringify(prefs));
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

