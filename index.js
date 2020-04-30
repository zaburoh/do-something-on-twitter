const tweet = require('./lib/tweet');
const retweet = require('./lib/retweet');
const search = require('./lib/search');
const { timeline, outputTweets, recentTweet } = require('./lib/timeline');

const flg = true;
if(flg) {
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
} else {
  const params = { 
    q: 'コロナ until:2020-04-30_07:00:00_JST',
    result_type: 'recent',
    count: 5,
    // until: '2020-04-22',
    lang: 'ja',
    locale: 'ja',
  };
  search(params, function(err, tweets) {
    if(err) return console.log(err);
    outputTweets(tweets, function(err) {
      if(err) return console.log(err);
    });
  });
}
