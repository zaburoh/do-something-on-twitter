const client = require('../config');

function tweet(message, callback) {
  client.post('statuses/update', {status: message}, function(error, tweet, response) {
    if (error) return console.log(error);
    console.log(tweet);
    if(callback) callback(tweet);
  });
}

module.exports = tweet;