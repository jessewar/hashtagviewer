var express = require("express");
var Twit = require("twit");
var app = express();
var twitter = new Twit({
	consumer_key: 'H54AD1rVwqpELtpgvjkZTJLyd',
	consumer_secret: 'G6mMnu3WLoRB34wdZ73hT9CCvXUMlJF7OiZnLJs4JEnxwJE8SB',
	access_token: '60665636-kQs6rSi6YSl2QZ8sHs2JThXGsvXwWrlBeY1S4Llnd',
	access_token_secret: 'A1mMbEnPovAwJWMpjoVRraAPkHtYQSF7RGEeoJ00ePy2N'
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

twitter.get('search/tweets', {q: '#messi', count: 1}, function(err, reply) {
	console.log("Error: " + err);
	console.log("Reply: " + JSON.stringify(reply));
});