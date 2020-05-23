const client = require('../../config');

module.exports = {
  timeline: function(screen_name, callback) {
    client.get('statuses/user_timeline', { screen_name: screen_name }, function(err, tweets, res) {
      if(err) return callback(err);
      callback(null, tweets);
    });
  },
  outputTweets: function(tweets, callback) {
    if(!(tweets instanceof Array)) return callback('Invalid arguments.');
    tweets.forEach((tweet) => {
      console.log('' + tweet.user.screen_name);
      console.log('' + tweet.id_str);
      console.log('' + new Date(tweet.created_at));
      console.log('' + tweet.text);
      console.log('retweet:' + tweet.retweet_count);
      console.log('favorite:' + tweet.favorite_count);
      console.log('hashtags:');
      tweet.entities.hashtags.forEach((hashtag) => {
        console.log('>>> ', hashtag);
      });
      console.log('user_mentions:');
      tweet.entities.user_mentions.forEach((user_mention) => {
        console.log('>>> ', user_mention);
      });
      console.log('urls:');
      tweet.entities.urls.forEach((url) => {
        console.log('>>> ', url);
      });
      console.log('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=');
    });
    console.log('tweets count:' + tweets.length);
  },
  recentTweet: function(tweets, callback) {
    if(!(tweets instanceof Array)) return callback('Invalid arguments.');
    let tweet = tweets[0];
    // console.log(tweet);
    // console.log('===========');
    console.log('' + tweet.user.screen_name);
    console.log('' + tweet.id);
    console.log('' + tweet.created_at);
    console.log('' + tweet.text);
    console.log('retweet:' + tweet.retweet_count);
    console.log('favorite:' + tweet.favorite_count);
    console.log('hashtags:');
    tweet.entities.hashtags.forEach((hashtag) => {
      console.log('>>> ', hashtag);
    });
    console.log('user_mentions:');
    tweet.entities.user_mentions.forEach((user_mention) => {
      console.log('>>> ', user_mention);
    });
    console.log('urls:');
    tweet.entities.urls.forEach((url) => {
      console.log('>>> ', url);
    });
    callback(null, tweet);
  }
}