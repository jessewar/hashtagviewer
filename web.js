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
app.engine('html', consolidate.swig)
app.use(express.static(__dirname + "/pages"));
app.use('/resources', express.static(__dirname + "/resources"));
app.use(express.bodyParser());

// Stores a mapping from session IDs to preferences.
var sessions = {};

// Preference defaults for sessions
var preferences_defaults = {
    board_title: "#Hashtag Viewer",
    query: "",
    animation: "slideright"
};

app.get('/', function(req, res) {
    res.sendfile(__dirname + "/pages/homepage.html");
});

app.post('/', function(req, res) {
    var query = req.body.query;
    
    // generate a random session ID and initialize default preferences
    var id = generate_sess_id();
    sessions[id] = preferences_defaults
    sessions[id].query = query;

    // Redirect to the session page
    res.redirect('/s/' + id);
});

// Fetches the tweets for the given id
app.get('/fetch/:id', function(req, res) {
    twitter.get('search/tweets', {q: '#' + sessions[req.params.id].query, count: 25}, function(err, reply) {
        var parsedData = new Array(25);
        for (var i = 0; i < 25; i++) {
            var status = reply.statuses[i];
            var user = status.user;
            parsedData[i] = {
                // status data
                favorite_count : status.favorite_count,
                retweet_count : status.retweet_count,
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
        }
        res.send(parsedData);
    });
});

// View the tweet board with the given session ID
app.get('/s/:sess_id', function(req, res, next) {
    if (sessions[req.params.sess_id] == undefined) {
        res.send('Session ID ' + req.params.sess_id + ' not found! :(');
        return;
    }

    session = sessions[req.params.sess_id]
    res.render(__dirname + "/pages/viewer_" + session.animation + ".html", {page_id: req.params.sess_id});
});

// View the admin page
app.get('/s/:sess_id/admin', function(req, res) {
    var renderable = sessions[req.params.sess_id];
    renderable.slideright_on = (renderable.animation == "slideright" ? "selected" : "");
    renderable.fading_on = (renderable.animation == "fading" ? "selected" : "");
    res.render(__dirname + "/pages/admin.html", sessions[req.params.sess_id]);
});

// Update the admin page information
app.post('/s/:sess_id/admin', function(req, res) {
    var prefs = {
        board_title: req.body.board_title,
        query: req.body.query,
        animation: req.body.animation
    };

    sessions[req.params.sess_id] = prefs;
    res.render(__dirname + "/pages/admin.html", sessions[req.params.sess_id]);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

// Generate a random session id
function generate_sess_id() {
    var result_id = "";

    for (var i = 0; i < 10; i++) {
        var character = Math.floor((Math.random() * 61));

        // Numbers
        if (character < 10) {
            result_id += String.fromCharCode(character + 48);
            // Uppercase Letters
        } else if (character < 36) {
            result_id += String.fromCharCode(character + 55);
            // Lowercase Letters
        } else {
            result_id += String.fromCharCode(character + 61);
        }
    }

    return result_id;
}