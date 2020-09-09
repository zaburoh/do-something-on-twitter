const tweet = require('./lib/twitter/tweet');
const woeid = require('./woeid');
const { place, getRandomTrend } = require('./lib/twitter/trends');
const moment = require('moment');

module.exports = {
  params: {
    id: woeid.Tokyo,
    exclude: ''
  },
  trendTweet: function() {
    place(this.params, function(err, trends) {
      if(err) return console.log(err);
      getRandomTrend(trends, function(trend) {
        tweet(moment().format('YYYY-MM-DD HH:mm:ss') + '\n\n' + 'なんで' + trend.name.replace(/#/, '') + 'なんだろう...？\n\n');
      })
    });
  }

}