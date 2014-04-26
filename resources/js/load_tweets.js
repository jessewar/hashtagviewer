var tweets = [];

$(document).ready(function() {
	_iterateTweets();
});

// Loads the next tweet into the specified element or returns it
// if it is not specified
function nextTweet(element) {
	var result = tweets.pop();

	if (tweets.length == 0) {
		_iterateTweets();
	}

	if (element == undefined) {
		return result;
	} else {
		element.find(".profile_pic").attr("src", result.profile_image_url);
		element.find(".username").text(result.screen_name);
		element.find(".date").text(result.created_at);
		element.find(".tweet .text").text(result.text);
		element.find(".favorites").text(result.favorite_count + " favorites");
		element.find(".retweets").text(result.retweet_count + " retweets");
	}
}

// Internal function that iterates to the next set of tweets
function _iterateTweets() {
	$.ajax({
		url: "/fetch/" + current_id
	}).done(function(data) {
		tweets = data;
	});
}