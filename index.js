const tweet = require('./lib/tweet');
const retweet = require('./lib/retweet');
const { timeline, outputTweets, recentTweet } = require('./lib/timeline');

const target_screen_name = 'tocho_koho';

timeline(target_screen_name, function(err, tweets) {
  if(err) return console.log(err);
  recentTweet(tweets, function(err, tweet) {
    if(err) {
      console.log(err);
    } else {
      retweet(tweet.id_str);
    }
  });
});
