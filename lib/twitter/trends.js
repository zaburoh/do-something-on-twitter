const client = require('../../config');

/**
 * {
 *  id: '',
 *  exclude: ''
 * }
 */
module.exports = {
  place: function(params, callback) {
    client.get('trends/place', params, function(err, trends, res) {
      if (err) return callback(err);
      if(res.statusCode === 200) return callback(null, trends[0].trends);
      callback({
        code: res.statusCode,
        message: res.statusMessage
      })
    });
  },
  outputTrends: function(trends, callback) {
    if(!(trends instanceof Array)) return callback('Invalid arguments.');
    // trends = trends.filter((trend) => trend.tweet_volume !== null);
    trends.sort((trendA, trendB) => {
        return trendA.tweet_volume - trendB.tweet_volume;
      })
      .forEach((trend) => {
        console.log(trend);
        console.log('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=');
      });
    console.log('trends count:' + trends.length);
  },
  getRandomTrend: function(trends, callback) {
    let random = Math.floor(Math.random() * 100) % trends.length;
    callback(trends[random]);
  }
}