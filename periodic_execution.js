const tweet = require('./lib/twitter/tweet');
const DateUtil = require('./lib/util/date_util');
const dateUtil = new DateUtil();
const woeid = require('./woeid');
const { place, getRandomTrend } = require('./lib/twitter/trends');

let params = {
  id: woeid.Tokyo,
  exclude: ''
}
place(params, function(err, trends) {
  if(err) return console.log(err);
  getRandomTrend(trends, function(trend) {
    tweet(dateUtil.formatedDate() + '\n\n' + trend.name.replace(/#/, '') + 'かもしれない...\n\n' + '#RaspberryPi4');
  })
});