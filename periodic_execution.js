const tweet = require('./lib/tweet');
const myDate = require('./lib/date');
let date = new myDate();

tweet(date.formatedDate());
