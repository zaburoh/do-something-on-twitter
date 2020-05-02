const client = require('../config');

module.exports = {
  favorite: function(callback) {
    client.get('favorites/list', function(err, tweets, response) {
      if(err) return callback(err);
      callback(tweets);
    });
  }
}