var express = require("express");
var Twit = require("twit");
var app = express();
var twitter = new Twit({
    consumer_key: 'H54AD1rVwqpELtpgvjkZTJLyd',
    consumer_secret: 'G6mMnu3WLoRB34wdZ73hT9CCvXUMlJF7OiZnLJs4JEnxwJE8SB',
    access_token: '60665636-kQs6rSi6YSl2QZ8sHs2JThXGsvXwWrlBeY1S4Llnd',
    access_token_secret: 'A1mMbEnPovAwJWMpjoVRraAPkHtYQSF7RGEeoJ00ePy2N'
});

app.get('/:query', function(req, res) {
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

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

