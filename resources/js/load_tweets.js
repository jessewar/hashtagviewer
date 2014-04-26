$(document).ready(function() {
	$.ajax({
		url: "/fetch/" + current_id
	}).done(function(data) {
		$(".profile_pic").attr("src", data.profile_image_url);
		$(".username").text(data.screen_name);
		$(".date").text(data.created_at);
		$(".tweet .text").text(data.text);
		$(".favs").text(data.favorite_count + " favorites");
		//$(".favs").text(data.favorite_count + " retweets");
	});
});