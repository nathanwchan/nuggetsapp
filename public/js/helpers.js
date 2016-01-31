function twitterUrl(nugget)
{
    // This method ensures that the constructed tweet, with nugget content, (optional) url and " via @nuggetsapp" signature don't exceed Twitter's 140 character limit.
    var content = nugget.text;
    var url = nugget.url;
    var via_text = " via @nuggetsapp";
    var tweet_limit = 140;
    var leftover_limit = tweet_limit - via_text.length;
    // Twitter auto-shortens urls when you pass HTML-encoded url as url=, plus specifcying short_url_length= (minimum 23 chars, see more here: https://dev.twitter.com/web/tweet-button/web-intent)
    var twitter_short_url_length = 24;
    var tweet_url_params = '';
    if (url) {
        leftover_limit -= twitter_short_url_length;
        tweet_url_params = '&url=' + encodeURIComponent(url) + '&short_url_length=' + twitter_short_url_length;
    }
    if (content.length > leftover_limit) {
        content = content.substring(0, leftover_limit - 3) + '...';
    }
    return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(content + via_text) + tweet_url_params;
}

function socialPost(nugget, isfb)
{
}

function facebookUrl(nugget)
{
  var appId = "1622775527965531"; 
  return "https://www.facebook.com/dialog/share?app_id=" + appId + "&display=popup&href=" + socialPost(nugget, true) + "&redirect_uri=" + window.location.href;
}

