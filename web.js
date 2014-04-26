var express = require("express");
var twitter = require("twitter");
var app = express();
var twit = new twitter({
	consumer_key: 'H54AD1rVwqpELtpgvjkZTJLyd',
	consumer_secret: 'G6mMnu3WLoRB34wdZ73hT9CCvXUMlJF7OiZnLJs4JEnxwJE8SB',
	access_token_key: '60665636-kQs6rSi6YSl2QZ8sHs2JThXGsvXwWrlBeY1S4Llnd',
	access_token_secret: 'A1mMbEnPovAwJWMpjoVRraAPkHtYQSF7RGEeoJ00ePy2N'
});

app.get('/', twit.gatekeeper('/login'), routes.index);
app.get('/login', routes.login);
app.get('/twauth', twit.login());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});