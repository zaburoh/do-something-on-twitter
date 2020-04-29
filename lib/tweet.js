const client = require('../config');

function tweet(message) {
  client.post('statuses/update', {status: message}, function(error, tweet, response) {
    if (error) return console.log(error);
    console.log(tweet);
  });
}

module.exports = tweet;