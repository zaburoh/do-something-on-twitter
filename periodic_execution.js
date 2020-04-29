const tweet = require('./lib/tweet');
const DateUtil = require('./lib/date_util');
const dateUtil = new DateUtil();

tweet(dateUtil.formatedDate());
