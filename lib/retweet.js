const client = require('../config');

function retweet(tweetId) {
  client.post('statuses/retweet/' + tweetId, function(err, tweet, res) {
    if(err) return console.log(err);
    console.log(tweet);
  })
}

module.exports = retweet;