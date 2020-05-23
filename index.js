const tweet = require('./lib/twitter/tweet');
const retweet = require('./lib/twitter/retweet');
const { search, generateQuery } = require('./lib/twitter/search');
const { timeline, outputTweets, recentTweet } = require('./lib/twitter/timeline');
const DateUtil = require('./lib/util/date_util');
const dateUtil = new DateUtil();


const flg = false;
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
    q: generateQuery({
      keyword: '東京最終',
      // since: true,
      // until: true,
      // filter: 'native_video',
      // outFilter: 'retweets',
      // from: 'yutaro0758',
      // mention: 'tocho_koho'
    }),
    result_type: 'popular',
    count: 5,
    // until: '2020-04-22',
    lang: 'ja',
    locale: 'ja',
  };
  console.log('query: ' + params.q);
  search(params, function(err, tweets) {
    if(err) return console.log(err);
    outputTweets(tweets, function(err) {
      if(err) return console.log(err);
    });
  });
}
