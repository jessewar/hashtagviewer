function showTweetSequence() {
    $(".block").fadeOut(1000, function() {
        onNextTweet($(".block"));
        $(".block").fadeIn(1000, function() {
        });
    });
}

// Loads the next tweet into the specified element or returns it
// if it is not specified
function onNextTweet(element) {
    var result = nextTweet(element);
    var popularity = result.favorite_count + result.retweet_count;
    setColorGradient(element, popularity);
    showTweetSequence();
}

