var tweets = [];

$(document).ready(function() {
    $.ajax({
        url: "/fetch/" + current_id
    }).done(function(data) {
        console.log(data);
        tweets = data;
        nextTweet($(".block"));  // fill .block divs with new tweet content
    });

    function showTweetSequence(){
        var $block = $(".block");
        $block.css({
            top: 0,
            left: 0
        });


        $block.animate({left:'50%'}, 7000, function() {
            $block.fadeOut(1000, function() {
             $block.fadeIn(0, function() {
                    nextTweet($block);
                    showTweetSequence();
             });
            });
        });
    }

    showTweetSequence();
});

// Loads the next tweet into the specified element or returns it
// if it is not specified
function nextTweet(element) {
    console.log(tweets);

    var result = tweets.pop();

    console.log(result);

    if (tweets.length == 0) {
        _iterateTweets();
    }

    if (element == undefined) {
        return result;
    } else {
        element.find(".profile_pic").attr("src", result.profile_image_url);
        element.find(".username").text("@" + result.screen_name);
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



// var $block = $(".block");
// nextTweet($block);
// $block.fadeIn(0);
// $block.css({
//     position: 'fixed',
//     top: $block.offset().top,
//     left: $block.offset().left
// });
// $block.animate({left :'60%'}, 10000, function() {
//     $block.fadeOut(1000, function() {
//         showTweetSequence();
//     });

// });
