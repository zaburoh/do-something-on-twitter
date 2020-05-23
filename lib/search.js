const client = require('../config');
const DateUtil = require('./util/date_util');
const dateUtil = new DateUtil();

module.exports = {
  search: function (params, callback) {
    client.get('search/tweets', params, function(err, tweets, res) {
      if(err) return callback(err);
      callback(null, tweets.statuses);
    });
  },
  generateQuery: function(option) {
    if(!typeof option === Object) return console.log('paramter not Object');
    if(!option.keyword) return console.log('keyword is required.');
    var query = '';
    if(option.keyword) query += option.keyword;
    if(option.since) query += ' since:' + dateUtil.sinceTodayForTwitter();
    if(option.until) query += ' until:' + dateUtil.untilNowForTwitter();
    if(option.filter) query += ' filter:' + option.filter;
    if(option.outFilter) query += ' -filter:' + option.outFilter;
    if(option.url) query += ' url:' + option.url;
    if(option.from) query += ' from:' + option.from;
    if(option.mention) query += ' @' + option.mention;

    return query;
  }
};