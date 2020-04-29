const client = require('../config');

function search(params, callback) {

  client.get('search/tweets', params, function(err, tweets, res) {
    if(err) return callback(err);
    callback(null, tweets.statuses);
  });
}

module.exports = search;