const client = require('../../config');

function reply(message, replyToId, callback) {
  client.post('statuses/update', {status: message, in_reply_to_status_id: replyToId, auto_populate_reply_metadata: true }, function(error, tweet, response) {
    if (error) return callback(error)
    if(callback) callback(null, tweet);
  });
}

module.exports = reply;